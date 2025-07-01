import express from 'express';
import {
    getAllPosts,
    createPost,
    getPostById,
    updatePost,
    deletePost
} from '../controllers/postController.js';

const router = express.Router();

// Define your post-related routes here
router.get('/', getAllPosts);
router.get('/:id', getPostById);
router.post('/', createPost);
router.put('/:id', updatePost);
router.delete('/:id', deletePost);

export default router;