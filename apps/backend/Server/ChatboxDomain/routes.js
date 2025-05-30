import express from 'express';
import ChatController from './controller.js';

const router = express.Router();

router.post('/', ChatController.sendMessage);
router.get('/conversation/:studentId/:adminId', ChatController.getConversation);

export default router;