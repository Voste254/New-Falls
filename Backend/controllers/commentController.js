import { sql } from '../config/db.js';


//CRUD

export const getAllComments = async(req, res) => {
    try {
        const comments = await sql`
            SELECT * FROM comments
            ORDER BY created_at DESC;
        `;
        console.log('Comments fetched successfully:', comments);
        res.status(200).json(comments);
    } catch (error) {
        console.error('Error fetching comments:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};


export const getCommentById = async(req, res) => {
    const { id } = req.params;
   if (!id) {
        return res.status(400).json({ error: 'Commment ID is required' });
   }

    try {
        const comment = await sql`
            SELECT * FROM comments WHERE id = ${id}
            ORDER BY created_at DESC
        `;

        if (comment.length === 0) {
            return res.status(404).json({ error: 'Comment not found' });
        }

        console.log('Comment fetched successfully:', comment[0]);
        res.status(200).json({success: true, data: comment[0]});
    } catch (error) {
        console.error('Error fetching comment:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};


export const createComment = async(req, res) => {
    const {id,post_id,user_id,text,created_at} = req.body;

    if (!id || !post_id || !user_id || !text || !created_at) {
        return res.status(400).json({ error: 'All fields are required' });
    }
    try {
        const newComment = await sql`
            INSERT INTO comments (id, post_id, user_id, text, created_at)
            VALUES (${id}, ${post_id}, ${user_id}, ${text}, ${created_at})
            RETURNING *;
        `;

        //console.log('Post created successfully:', newPost);
        res.status(201).json({success: true, data: newComment[0]});
    } catch (error) {
        console.error('Error creating post:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};


export const updateComment = async(req, res) => { 
    const { id } = req.params;
    const { post_id,user_id,text,created_at } = req.body;

    if (!id || !post_id || !user_id || !text || !created_at) {
        return res.status(400).json({ error: 'All fields are required' });
    }

    try {
        const updatedComment = await sql`
            UPDATE comments
            SET post_id = ${post_id}, user_id = ${user_id}, text = ${text}, created_at = ${created_at}
            WHERE id = ${id}
            RETURNING *;
        `;

        if (updatedComment.length === 0) {
            return res.status(404).json({ error: 'Comment not found' });
        }

        console.log('Comment updated successfully:', updatedComment[0]);
        res.status(200).json({success: true, data: updatedComment[0]});
    } catch (error) {
        console.error('Error updating comment:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};


export const deleteComment = async(req, res) => {
    const { id } = req.params;

    if (!id) {
        return res.status(400).json({ error: 'Comment ID is required' });
    }

    try {
        const deletedComment = await sql`
            DELETE FROM comments WHERE id = ${id} RETURNING *;
        `;

        if (deletedComment.length === 0) {
            return res.status(404).json({ error: 'Comment not found' });
        }

        console.log('Post deleted successfully:', deletedComment[0]);
        res.status(200).json({success: true, data: deletedComment[0]});
    } catch (error) {
        console.error('Error deleting post:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};  