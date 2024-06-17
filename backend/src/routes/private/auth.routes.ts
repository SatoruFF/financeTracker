import authMiddle from './../../middlewares/auth.middleware.js';
import { Router } from 'express'
import { UserController } from '../../controllers/user.controller.js'

const router: Router = Router()

router.post("/register", UserController.registration)
router.post("/login", UserController.login)
router.get("/auth", authMiddle, UserController.auth)

export default router