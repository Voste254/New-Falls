import express from 'express';
import {
    getAllPosts,
    createPost,
    getPostById,
    updatePost,
    deletePost
} from '../controllers/messageController.js';

const router = express.Router();

// Define your post-related routes here
router.get('/', getAllMessages);
router.get('/:id', getMessageById);
router.post('/', createMessage);
router.put('/:id', updateMessage);
router.delete('/:id', deleteMessage);

export default router;