import verifySignUp from '../middlewares/verifySignUp.js'
import * as controller from '../controllers/auth.controller.js'
import express from 'express'
const router = express.Router()

router.post('/signup', [verifySignUp.checkDuplicateUsernameOrEmail, verifySignUp.checkRolesExisted], controller.signup)

router.post('/signin', controller.signin)

router.post('/signout', controller.signout)

export default router
