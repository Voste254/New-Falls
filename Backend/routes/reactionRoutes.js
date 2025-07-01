import express from 'express';
import {
    getAllReactions,
    createReaction,
    getReactionById,
    updateReaction,
    deleteReaction
} from '../controllers/reactionController.js';

const router = express.Router();

// Define your post-related routes here
router.get('/', getAllReactions);
router.get('/:id', getReactionById);
router.post('/', createReaction);
router.put('/:id', updateReaction);
router.delete('/:id', deleteReaction);

export default router;