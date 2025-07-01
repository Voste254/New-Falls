import express from 'express';
import {
    getAllCart_item,
    createCart_item,
    getCart_itemById,
    updateCart_item,
    deleteCart_item
} from '../controllers/cartController.js';

const router = express.Router();

// Define your cart item-related routes here
router.get('/', getAllCart_item);
router.get('/:id', getCart_itemById);
router.post('/', createCart_item);
router.put('/:id', updateCart_item);
router.delete('/:id', deleteCart_item);

export default router;