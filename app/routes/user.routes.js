import authJwt from '../middlewares/authJwt.js'
import allAccess from '../controllers/users/users.allAccess.controller.js'
import userBoard from '../controllers/users/users.userBoard.controller.js'
import moderatorBoard from '../controllers/users/users.moderatorBoard.controller.js'
import adminBoard from '../controllers/users/users.adminBoard.controller.js'

import express from 'express'
const router = express.Router()

router.get('/all', allAccess)

router.get('/user', [authJwt.verifyToken], userBoard)

router.get('/mod', [authJwt.verifyToken, authJwt.isModerator], moderatorBoard)

router.get('/admin', [authJwt.verifyToken, authJwt.isAdmin], adminBoard)

export default router
