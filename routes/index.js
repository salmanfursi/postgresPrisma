import { Router } from 'express';
import userRoute from './userRoute.js'
import postRoute from './postRoute.js'
import commentRoute from './commentRoute.js'
const router = Router();

router.use('/api/user', userRoute);
router.use('/api/post', postRoute);
router.use('/api/comment', commentRoute);

export default router;