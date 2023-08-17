import config from '../config/auth.config.js'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import User from './../models/user.model.js'
import Role from './../models/role.model.js'

export async function signup (req, res) {
  try {
    const user = new User({
      username: req.body.username,
      email: req.body.email,
      password: bcrypt.hashSync(req.body.password, 8),
    })

    await user.save()

    const roles = req.body.roles || ['user']
    const foundRoles = await Role.find({ name: { $in: roles } })

    user.roles = foundRoles.map((role) => role._id)
    await user.save()

    res.send({ message: 'User was registered successfully!' })
  } catch (err) {
    res.status(500).send({ message: err.message })
  }
}

export async function signin (req, res) {
  try {
    const user = await User.findOne({ username: req.body.username }).populate(
      'roles',
      '-__v'
    )

    if (!user) {
      return res.status(404).send({ message: 'User Not found.' })
    }

    const passwordIsValid = bcrypt.compareSync(
      req.body.password,
      user.password
    )

    if (!passwordIsValid) {
      return res.status(401).send({ message: 'Invalid Password!' })
    }

    const token = jwt.sign({ id: user.id }, config.secret, {
      algorithm: 'HS256',
      allowInsecureKeySizes: true,
      expiresIn: 86400, // 24 hours
    })

    const authorities = user.roles.map((role) => 'ROLE_' + role.name.toUpperCase())

    req.session.token = token

    res.status(200).send({
      id: user._id,
      username: user.username,
      email: user.email,
      roles: authorities,
    })
  } catch (err) {
    res.status(500).send({ message: err.message })
  }
}

export async function signout (req, res) {
  try {
    req.session = null
    res.status(200).send({ message: `You've been signed out!` })
  } catch (err) {
    res.status(500).send({ message: err.message })
  }
}
