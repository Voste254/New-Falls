import { sql } from '../config/db.js';


//CRUD

export const getAllFollows = async(req, res) => {
    try {
        const follows = await sql`
            SELECT * FROM follows
            ORDER BY created_at DESC;
        `;
        console.log('Follows fetched successfully:', follows);
        res.status(200).json(follows);
    } catch (error) {
        console.error('Error fetching follows:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};


export const getFollowById = async(req, res) => {
    const { id } = req.params;
   if (!id) {
      return res.status(400).json({ error: 'Follow ID is required' });
    }

    try {
        const follow = await sql`
            SELECT * FROM follows WHERE id = ${id}
            ORDER BY created_at DESC
        `;

        if (follow.length === 0) {
            return res.status(404).json({ error: 'Follow not found' });
        }

        console.log('Follow fetched successfully:', follow[0]);
        res.status(200).json({success: true, data: follow[0]});
    } catch (error) {
        console.error('Error fetching follow:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};


export const createFollow = async(req, res) => {
    const {follower_id, following_id, created_at, UNIQUE} = req.body;

    if (!follower_id || !following_id || !created_at || !UNIQUE) {
        return res.status(400).json({ error: 'All fields are required' });
    }
    try {
        const newFollow = await sql`
            INSERT INTO follows (follower_id, following_id, created_at, UNIQUE)
            VALUES (${follower_id}, ${following_id}, ${created_at}, ${UNIQUE})
            RETURNING *;
        `;

        //console.log('Post created successfully:', newPost);
        res.status(201).json({success: true, data: newFollow[0]});
    } catch (error) {
        console.error('Error creating post:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};


export const updateFollow = async(req, res) => { 
    const { id } = req.params;
    const { follower_id, following_id, created_at, UNIQUE } = req.body;

    if (!id || !follower_id || !following_id || !created_at || !UNIQUE) {
        return res.status(400).json({ error: 'All fields are required' });
    }

    try {
        const updatedFollow = await sql`
            UPDATE follows
            SET follower_id = ${follower_id}, following_id = ${following_id}, created_at = ${created_at}, UNIQUE = ${UNIQUE}
            WHERE id = ${id}
            RETURNING *;
        `;

        if (updatedFollow.length === 0) {
            return res.status(404).json({ error: 'Follow not found' });
        }

        console.log('Follow updated successfully:', updatedFollow[0]);
        res.status(200).json({success: true, data: updatedFollow[0]});
    } catch (error) {
        console.error('Error updating follow:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};


export const deleteFollow = async(req, res) => {
    const { id } = req.params;

    if (!id) {
        return res.status(400).json({ error: 'Follow ID is required' });
    }

    try {
        const deletedFollow = await sql`
            DELETE FROM follows WHERE id = ${id} RETURNING *;
        `;

        if (deletedFollow.length === 0) {
            return res.status(404).json({ error: 'Follow not found' });
        }

        console.log('Follow deleted successfully:', deletedFollow[0]);
        res.status(200).json({success: true, data: deletedFollow[0]});
    } catch (error) {
        console.error('Error deleting follow:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};    