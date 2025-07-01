import express from 'express';
import {
    getAllUser_profile,
    createUser_profile,
    getUser_profileByIdID,
    updateUser_profile,
    deleteUser_profile
} from '../controllers/user_profileController.js';

const router = express.Router();

// Define your post-related routes here
router.get('/', getAllUser_profile);
router.get('/:id', getUser_profileByIdID);
router.post('/', createUser_profile);
router.put('/:id', updateUser_profile);
router.delete('/:id', deleteUser_profile);

export default router;