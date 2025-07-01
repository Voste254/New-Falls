import express from 'express';
import {
    getAllMessage_recipients,
    getMessage_recipientById,
    createMessage_recipient,
    updateMessage_recipient,
    deleteMessage_recipient
} from '../controllers/message_recipientController.js';

const router = express.Router();

// Define your post-related routes here
router.get('/', getAllMessage_recipients);
router.get('/:id', getMessage_recipientById);
router.post('/', createMessage_recipient);
router.put('/:id', updateMessage_recipient);
router.delete('/:id', deleteMessage_recipient);

export default router;