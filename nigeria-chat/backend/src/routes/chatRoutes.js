import express from 'express';
import {
  getConversations,
  getMessages,
  sendMessage,
  startConversation
} from '../controllers/chatController.js';
import { requireAuth } from '../middleware/authMiddleware.js';

const router = express.Router();

router.use(requireAuth);

router.get('/conversations', getConversations);
router.post('/conversations', startConversation);
router.get('/conversations/:conversationId/messages', getMessages);
router.post('/conversations/:conversationId/messages', sendMessage);

export default router;
