import { Router } from 'express';
import authRouter from './private/auth.routes.js';
const router = Router();
router.use('/user', authRouter);
export default router;
//# sourceMappingURL=index.js.map