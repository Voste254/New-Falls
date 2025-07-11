import express from 'express';
import {
    getAllCarts,
    createCart,
    getCartById,
    updateCart,
    deleteCart
} from '../controllers/cartController.js';

const router = express.Router();

// Define your cart-related routes here
router.get('/', getAllCarts);
router.get('/:id', getCartById);
router.post('/', createCart);
router.put('/:id', updateCart);
router.delete('/:id', deleteCart);

export default router;