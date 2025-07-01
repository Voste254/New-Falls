import { sql } from '../config/db.js';


//CRUD

export const getAllcart_items = async(req, res) => {
    try {
        const cart_items = await sql`
            SELECT * FROM cart_items
            ORDER BY created_at DESC;
        `;
        console.log('Cart items fetched successfully:', cart_items);
        res.status(200).json(cart_items);
    } catch (error) {
        console.error('Error fetching posts:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};


export const getCart_itemById = async(req, res) => {
    const { id } = req.params;
    if (!id) {
        return res.status(400).json({ error: 'Cart item ID is required' });
    }

    try {
        const cart_item = await sql`
            SELECT * FROM cart_items WHERE id = ${id}
            ORDER BY created_at DESC
        `;

        if (cart_item.length === 0) {
            return res.status(404).json({ error: 'Cart item not found' });
        }

        console.log('Cart item fetched successfully:', cart_item[0]);
        res.status(200).json({success: true, data: cart_item [0]});
    } catch (error) {
        console.error('Error fetching cart item:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};


export const createCart_item = async(req, res) => {
    const {name,description,price,media} = req.body;

    if (!name || !description || !price || !media) {
        return res.status(400).json({ error: 'All fields are required' });
    }
    try {
        const newCart_item = await sql`
            INSERT INTO cart_items (name, description, price, media)
            VALUES (${name}, ${description}, ${price}, ${media})
            RETURNING *;
        `;

        //console.log('Post created successfully:', newPost);
        res.status(201).json({success: true, data: newCart_item[0]});
    } catch (error) {
        console.error('Error creating post:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};


export const updateCart_item = async(req, res) => { 
    const { id } = req.params;
    const { cart_id, post_id, quantity, added_at, UNIQUE} = req.body;

    if (!cart_id || !post_id || !quantity || !added_at || !UNIQUE) {
        return res.status(400).json({ error: 'All fields are required' });
    }

    try {
        const updatedCart_item = await sql`
            UPDATE cart_items
            SET cart_id = ${cart_id}, post_id = ${post_id}, quantity = ${quantity}, added_at = ${added_at}, UNIQUE = ${UNIQUE}
            WHERE id = ${id}
            RETURNING *;
        `;

        if (updatedCart_item.length === 0) {
            return res.status(404).json({ error: 'Cart item not found' });
        }

        console.log('Cart_item updated successfully:', updatedCart_item[0]);
        res.status(200).json({success: true, data: updatedCart_item[0]});
    } catch (error) {
        console.error('Error updating cart_item:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};


export const deleteCart_item = async(req, res) => {
    const { id } = req.params;

    if (!id) {
        return res.status(400).json({ error: 'Cart item ID is required' });
    }

    try {
        const deletedCart_item = await sql`
            DELETE FROM cart_items WHERE id = ${id} RETURNING *;
        `;

        if (deletedCart_item.length === 0) {
            return res.status(404).json({ error: 'Cart item not found' });
        }

        console.log('Cart item deleted successfully:', deletedCart_item[0]);
        res.status(200).json({success: true, data: deletedCart_item[0]});
    } catch (error) {
        console.error('Error deleting cart item:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};  