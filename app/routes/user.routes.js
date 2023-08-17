import authJwt from '../middlewares/authJwt.js'
import * as controller from '../controllers/user.controller.js'
import express from 'express'
const router = express.Router()

router.get('/all', controller.allAccess)

router.get('/user', [authJwt.verifyToken], controller.userBoard)

router.get('/mod', [authJwt.verifyToken, authJwt.isModerator], controller.moderatorBoard)

router.get('/admin', [authJwt.verifyToken, authJwt.isAdmin], controller.adminBoard)

export default router
