import config from '../../config/auth.config.js'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import User from '../../repository/users/user.model.js'

export default async function signin (req, res) {
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