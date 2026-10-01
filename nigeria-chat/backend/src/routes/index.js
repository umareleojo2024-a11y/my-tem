import express from 'express';
import authRoutes from './authRoutes.js';
import userRoutes from './userRoutes.js';
import postRoutes from './postRoutes.js';
import chatRoutes from './chatRoutes.js';
import mediaRoutes from './mediaRoutes.js';
import notificationRoutes from './notificationRoutes.js';

const router = express.Router();

router.get('/health', (req, res) => {
  res.json({
    status: 'healthy',
    project: 'Nigeria Chat',
    owner: 'Eleojocafe',
    timestamp: new Date().toISOString()
  });
});

router.use('/auth', authRoutes);
router.use('/users', userRoutes);
router.use('/posts', postRoutes);
router.use('/chat', chatRoutes);
router.use('/media', mediaRoutes);
router.use('/notifications', notificationRoutes);

export default router;
