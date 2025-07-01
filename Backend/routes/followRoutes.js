import express from 'express';
import {
    getAllFollows,
    createFollow,
    getFollowById,
    updateFollow,
    deleteFollow
} from '../controllers/followController.js';

const router = express.Router();

// Define your follow-related routes here
router.get('/', getAllFollows);
router.get('/:id', getFollowById);
router.post('/', createFollow);
router.put('/:id', updateFollow);
router.delete('/:id', deleteFollow);

export default router;