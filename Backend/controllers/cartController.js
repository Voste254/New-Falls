import { sql } from '../config/db.js';


//CRUD

export const getAllCarts = async(req, res) => {
    try {
        const carts = await sql`
            SELECT * FROM carts
            ORDER BY created_at DESC;
        `;
        console.log('Carts fetched successfully:', carts);
        res.status(200).json(carts);
    } catch (error) {
        console.error('Error fetching carts:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};


export const getCartById = async(req, res) => {
    const { id } = req.params;
    if (!id) {
       return res.status(400).json({ error: 'Cart ID is required' });
    }

    try {
        const cart = await sql`
            SELECT * FROM carts WHERE id = ${id}
            ORDER BY created_at DESC
        `;

        if (cart.length === 0) {
            return res.status(404).json({ error: 'Cart  not found' });
        }

        console.log('Cart fetched successfully:', cart[0]);
        res.status(200).json({success: true, data: cart[0]});
    } catch (error) {
        console.error('Error fetching cart:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};


export const createCart = async(req, res) => {
    const {id,user_id,created_at} = req.body;

    if (!id || !user_id || !created_at || !media) {
        return res.status(400).json({ error: 'All fields are required' });
    }
    try {
        const newCart = await sql`
            INSERT INTO carts (id, user_id, created_at)
            VALUES (${id}, ${user_id}, ${created_at})
            RETURNING *;
        `;

        console.log('Cart created successfully:', newCart);
        res.status(201).json({success: true, data: newCart});
    } catch (error) {
        console.error('Error creating cart:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};


export const updateCart = async(req, res) => { 
    const { id } = req.params;
    const { user_id, created_at } = req.body;

    if (!id || !user_id || !created_at) {
        return res.status(400).json({ error: 'All fields are required' });
    }

    try {
        const updatedCart = await sql`
            UPDATE carts
            SET user_id = ${user_id}, created_at = ${created_at}
            WHERE id = ${id}
            RETURNING *;
        `;

        if (updatedCart.length === 0) {
            return res.status(404).json({ error: 'Cart not found' });
        }

        console.log('Cart updated successfully:', updatedCart[0]);
        res.status(200).json({success: true, data: updatedCart[0]});
    } catch (error) {
        console.error('Error updating cart:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};


export const deleteCart = async(req, res) => {
    const { id } = req.params;

    if (!id) {
        return res.status(400).json({ error: 'Cart ID is required' });
    }

    try {
        const deletedCart = await sql`
            DELETE FROM carts WHERE id = ${id} RETURNING *;
        `;

        if (deletedCart.length === 0) {
            return res.status(404).json({ error: 'Cart not found' });
        }

        console.log('Cart deleted successfully:', deletedCart[0]);
        res.status(200).json({success: true, data: deletedCart[0]});
    } catch (error) {
        console.error('Error deleting cart:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};   