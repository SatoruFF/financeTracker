import authMiddle from '../../middlewares/auth.middleware.js';
import { Router } from 'express'
import { UserController } from '../../controllers/user.controller.js'

const router: Router = Router()

router.get("/balance", authMiddle, UserController.auth)

export default router