import { Router } from 'express';
import authRouter from './private/auth.routes.js'
const router: Router = Router();

router.use('/user', authRouter)

export default router