import express from 'express';
import { getProfile, updateProfile, searchUsers } from '../controllers/userController.js';
import { requireAuth } from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/search', searchUsers);
router.get('/:id', getProfile);
router.put('/me', requireAuth, updateProfile);

export default router;
