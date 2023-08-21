import bcrypt from 'bcryptjs'
import User from './../../repository/users/user.model.js'
import Role from './../../repository/roles/role.model.js'

export default async function signup (req, res) {
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