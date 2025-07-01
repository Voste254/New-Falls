import express from 'express';
import {
    getAllVroom_posts,
    createVroom_post,
    getVroom_postById,
    updateVroom_post,
    deleteVroom_post
} from '../controllers/vroom_postController.js';

const router = express.Router();

// Define your post-related routes here
router.get('/', getAllVroom_posts);
router.get('/:id', getVroom_postById);
router.post('/', createVroom_post);
router.put('/:id', updateVroom_post);
router.delete('/:id', deleteVroom_post);

export default router;