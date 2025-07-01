import express from 'express';
import {
    getAllVrooms,
    createVroom,
    getVroomById,
    updateVroom,
    deleteVroom
} from '../controllers/vroomController.js';

const router = express.Router();

// Define your vroom-related routes here
router.get('/', getAllVrooms);
router.get('/:id', getVroomById);
router.post('/', createVroom);
router.put('/:id', updateVroom);
router.delete('/:id', deleteVroom);

export default router;