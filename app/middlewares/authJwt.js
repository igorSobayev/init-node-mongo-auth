import jwt from 'jsonwebtoken'
import config from '../config/auth.config.js'
import User from '../repository/users/user.model.js'
import Role from '../repository/roles/role.model.js'

export const verifyToken = (req, res, next) => {
  let token = req.session.token

  if (!token) {
    return res.status(403).send({ message: 'No token provided!' })
  }

  jwt.verify(token, config.secret, (err, decoded) => {
    if (err) {
      return res.status(401).send({
        message: 'Unauthorized!',
      })
    }
    req.userId = decoded.id
    next()
  })
}

export const isAdmin = async (req, res, next) => {
  try {
    const user = await User.findById(req.userId)
    const roles = await Role.find({ _id: { $in: user.roles } })

    const adminRole = roles.find((role) => role.name === 'admin')

    if (adminRole) {
      next()
    } else {
      res.status(403).send({ message: 'Require Admin Role!' })
    }
  } catch (err) {
    res.status(500).send({ message: err.message })
  }
}

export const isModerator = async (req, res, next) => {
  try {
    const user = await User.findById(req.userId)
    const roles = await Role.find({ _id: { $in: user.roles } })

    const moderatorRole = roles.find((role) => role.name === 'moderator')

    if (moderatorRole) {
      next()
    } else {
      res.status(403).send({ message: 'Require Moderator Role!' })
    }
  } catch (err) {
    res.status(500).send({ message: err.message })
  }
}

const authJwt = {
  verifyToken,
  isAdmin,
  isModerator,
}

export default authJwt
