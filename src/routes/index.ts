import { Router } from 'express';
const router: Router = Router();

router.use('/post', require('./postRouter'));

export default router;