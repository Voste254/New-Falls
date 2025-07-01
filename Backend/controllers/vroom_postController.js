import { sql } from '../config/db.js';


//CRUD

export const getAllVroom_posts = async(req, res) => {
    try {
        const posts = await sql`
            SELECT * FROM vroom_posts
            ORDER BY created_at DESC;
        `;
        console.log('Vroom posts fetched successfully:', posts);
        res.status(200).json(posts);
    } catch (error) {
        console.error('Error fetching vroom posts:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};


export const getVroom_postById = async(req, res) => {
    const { id } = req.params;
    if (!id) {
       return res.status(400).json({ error: 'Post ID is required' });
   }

    try {
        const vroom_post = await sql`
            SELECT * FROM vroom_posts WHERE id = ${id}
            ORDER BY created_at DESC
        `;

        if (vroom_post.length === 0) {
            return res.status(404).json({ error: 'vroom post not found' });
        }

        console.log('vroom post fetched successfully:', vroom_post[0]);
        res.status(200).json({success: true, data: vroom_post[0]});
    } catch (error) {
        console.error('Error fetching vroom post:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};


export const createVroom_post = async(req, res) => {
    const {id,vroom_id,post_id,added_at,UNIQUE} = req.body;

    if (!id || !vroom_id || !post_id || !added_at || !UNIQUE) {
        return res.status(400).json({ error: 'All fields are required' });
    }
    try {
        const newVroom_post = await sql`
            INSERT INTO vroom_posts (id, vroom_id, post_id, added_at, UNIQUE)
            VALUES (${id}, ${vroom_id}, ${post_id}, ${added_at}, ${UNIQUE})
            RETURNING *;
        `;

        //console.log('Post created successfully:', newPost);
        res.status(201).json({success: true, data: newVroom_post});
    } catch (error) {
        console.error('Error creating vroom post:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};


export const updateVroom_post = async(req, res) => { 
    const { id } = req.params;
    const { vroom_id, post_id, added_at, UNIQUE } = req.body;

    if (!id || !vroom_id || !post_id || !added_at || !UNIQUE) {
        return res.status(400).json({ error: 'All fields are required' });
    }

    try {
        const updatedVroom_post = await sql`
            UPDATE vroom_posts
            SET vroom_id = ${vroom_id}, post_id = ${post_id}, added_at = ${added_at}, UNIQUE = ${UNIQUE}
            WHERE id = ${id}
            RETURNING *;
        `;

        if (updatedVroom_post.length === 0) {
            return res.status(404).json({ error: 'Vroom post not found' });
        }

        console.log('Vroom post updated successfully:', updatedVroom_post[0]);
        res.status(200).json({success: true, data: updatedVroom_post[0]});
    } catch (error) {
        console.error('Error updating vroom post:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};


export const deleteVroom_post = async(req, res) => {
    const { id } = req.params;

    if (!id) {
        return res.status(400).json({ error: 'Vroom post ID is required' });
    }

    try {
        const deletedVroom_post = await sql`
            DELETE FROM vroom_posts WHERE id = ${id} RETURNING *;
        `;

        if (deletedVroom_post.length === 0) {
            return res.status(404).json({ error: 'Vroom post not found' });
        }

        console.log('Vroom post deleted successfully:', deletedVroom_post[0]);
        res.status(200).json({success: true, data: deletedVroom_post[0]});
    } catch (error) {
        console.error('Error deleting vroom post:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
}; 