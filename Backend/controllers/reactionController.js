import { sql } from '../config/db.js';


//CRUD

export const getAllReactions = async(req, res) => {
    try {
        const reactions = await sql`
            SELECT * FROM reactions
            ORDER BY created_at DESC;
        `;
        console.log('Reactions fetched successfully:', reactions);
        res.status(200).json(reactions);
    } catch (error) {
        console.error('Error fetching reactions:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};


export const getReactionById = async(req, res) => {
    const { id } = req.params;
    if (!id) {
       return res.status(400).json({ error: 'Reaction ID is required' });
    }

    try {
        const reaction = await sql`
            SELECT * FROM reactions WHERE id = ${id}
            ORDER BY created_at DESC
        `;

        if (reaction.length === 0) {
            return res.status(404).json({ error: 'Reaction not found' });
        }

        console.log('Reaction fetched successfully:', reaction[0]);
        res.status(200).json({success: true, data: reaction[0]});
    } catch (error) {
        console.error('Error fetching reaction:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};


export const createReaction = async(req, res) => {
    const {id,user_id, post_id, vroom_id, reaction_type,created_at} = req.body;

    if (!id || !user_id || !post_id || !vroom_id || !reaction_type || !created_at) {
        return res.status(400).json({ error: 'All fields are required' });
    }
    try {
        const newReaction = await sql`
            INSERT INTO reactions (id, user_id, post_id, vroom_id, reaction_type, created_at)
            VALUES (${id}, ${user_id}, ${post_id}, ${vroom_id}, ${reaction_type}, ${created_at})
            RETURNING *;
        `;

        
        res.status(201).json({success: true, data: newReaction[0]});
    } catch (error) {
        console.error('Error creating reaction:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};


export const updateReaction = async(req, res) => { 
    const { id } = req.params;
    const { user_id, post_id, vroom_id, reaction_type, created_at } = req.body;

    if (!id || !user_id || !post_id || !vroom_id || !reaction_type || !created_at) {
        return res.status(400).json({ error: 'All fields are required' });
    }

    try {
        const updatedReaction = await sql`
            UPDATE reactions
            SET user_id = ${user_id}, post_id = ${post_id}, vroom_id = ${vroom_id}, reaction_type = ${reaction_type}, created_at = ${created_at}
            WHERE id = ${id}
            RETURNING *;
        `;

        if (updatedReaction.length === 0) {
            return res.status(404).json({ error: 'Reaction not found' });
        }

        console.log('Reaction updated successfully:', updatedReaction[0]);
        res.status(200).json({success: true, data: updatedReaction[0]});
    } catch (error) {
        console.error('Error updating reaction:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};


export const deleteReaction = async(req, res) => {
    const { id } = req.params;

    if (!id) {
        return res.status(400).json({ error: 'Reaction ID is required' });
    }

    try {
        const deletedReaction = await sql`
            DELETE FROM reactions WHERE id = ${id} RETURNING *;
        `;

        if (deletedReaction.length === 0) {
            return res.status(404).json({ error: 'Reaction not found' });
        }

        console.log('deleted :', deletedReaction[0]);
        res.status(200).json({success: true, data: deletedReaction[0]});
    } catch (error) {
        console.error('Error deleting :', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};  