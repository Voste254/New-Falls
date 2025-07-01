import { sql } from '../config/db.js';


//CRUD

export const getAllVrooms = async(req, res) => {
    try {
        const vrooms = await sql`
            SELECT * FROM vrooms
            ORDER BY created_at DESC;
        `;
        console.log('Vrooms fetched successfully:', vrooms);
        res.status(200).json(vrooms);
    } catch (error) {
        console.error('Error fetching vrooms:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};


export const getVroomById = async(req, res) => {
    const { id } = req.params;
    if (!id) {
        return res.status(400).json({ error: 'Vroom ID is required' });
    }

    try {
        const vroom = await sql`
            SELECT * FROM vrooms WHERE id = ${id}
            ORDER BY created_at DESC
        `;

        if (vroom.length === 0) {
            return res.status(404).json({ error: 'Vroom not found' });
        }

        console.log('Vroom fetched successfully:', vroom[0]);
        res.status(200).json({success: true, data: vroom[0]});
    } catch (error) {
        console.error('Error fetching vroom:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};


export const createVroom = async(req, res) => {
    const {id,user_id,name,description,created_at} = req.body;

    if (!id || !user_id || !name || !description || !created_at) {
        return res.status(400).json({ error: 'All fields are required' });
    }
    try {
        const newVroom = await sql`
            INSERT INTO vrooms (id,user_id,name,description,created_at)
            VALUES (${id}, ${user_id}, ${name}, ${description}, ${created_at})
            RETURNING *;
        `;

        console.log('Vroom created successfully:', newVroom);
        res.status(201).json({success: true, data: newVroom});
    } catch (error) {
        console.error('Error creating vroom:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};


export const updateVroom = async(req, res) => { 
    const { id } = req.params;
    const { user_id, name, description, created_at } = req.body;

    if (!id || !user_id || !name || !description || !created_at) {
        return res.status(400).json({ error: 'All fields are required' });
    }

    try {
        const updatedVroom = await sql`
            UPDATE vrooms
            SET user_id = ${user_id}, name = ${name}, description = ${description}, created_at = ${created_at}
            WHERE id = ${id}
            RETURNING *;
        `;

        if (updatedPost.length === 0) {
            return res.status(404).json({ error: 'Post not found' });
        }

        console.log('Post updated successfully:', updatedVroom[0]);
        res.status(200).json({success: true, data: updatedVroom[0]});
    } catch (error) {
        console.error('Error updating vroom:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};


export const deleteVroom = async(req, res) => {
    const { id } = req.params;

    if (!id) {
        return res.status(400).json({ error: 'Vroom ID is required' });
    }

    try {
        const deletedVroom = await sql`
            DELETE FROM vrooms WHERE id = ${id} RETURNING *;
        `;

        if (deletedVroom.length === 0) {
            return res.status(404).json({ error: 'Vroom not found' });
        }

        console.log('Vroom deleted successfully:', deletedVroom[0]);
        res.status(200).json({success: true, data: deletedVroom[0]});
    } catch (error) {
        console.error('Error deleting vroom:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};  