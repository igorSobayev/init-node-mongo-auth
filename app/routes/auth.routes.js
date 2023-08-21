import verifySignUp from '../middlewares/verifySignUp.js'
import signup from '../controllers/users/users.signup.controller.js'
import signin from '../controllers/users/users.signin.controller.js'
import signout from '../controllers/users/users.signout.controller.js'

import express from 'express'
const router = express.Router()

router.post('/signup', [verifySignUp.checkDuplicateUsernameOrEmail, verifySignUp.checkRolesExisted], signup)

router.post('/signin', signin)

router.post('/signout', signout)

export default router
