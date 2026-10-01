import express from 'express';
import { getPosts, createPost, reactToPost } from '../controllers/postController.js';
import { requireAuth } from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/', getPosts);
router.post('/', requireAuth, createPost);
router.post('/:id/react', requireAuth, reactToPost);

export default router;
