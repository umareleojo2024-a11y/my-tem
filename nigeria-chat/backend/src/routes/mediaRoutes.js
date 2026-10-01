import express from 'express';
import { getUploadUrl } from '../controllers/mediaController.js';
import { requireAuth } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/upload-url', requireAuth, getUploadUrl);

export default router;
