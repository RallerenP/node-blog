import express from 'express';
import authRouter from './auth/auth.mjs';
import postsRouter from './posts/posts.mjs';

const router = express.Router();

router.use('/auth', authRouter);
router.use('/posts', postsRouter);

export default router;
