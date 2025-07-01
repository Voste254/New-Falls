import express from 'express';
import {
    getAllComments,
    createComment,
    getCommentById,
    updateComment,
    deleteComment
} from '../controllers/commentController.js';

const router = express.Router();

// Define your post-related routes here
router.get('/', getAllComments);
router.get('/:id', getCommentById);
router.post('/', createComment);
router.put('/:id', updateComment);
router.delete('/:id', deleteComment);

export default router;