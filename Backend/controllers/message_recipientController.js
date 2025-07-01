import { sql } from '../config/db.js';


//CRUD

export const getAllMessage_recipients = async(req, res) => {
    try {
        const message_recipients = await sql`
            SELECT * FROM message_recipients
            ORDER BY created_at DESC;
        `;
        console.log('Message_recipients fetched successfully:', message_recipients);
        res.status(200).json(message_recipients);
    } catch (error) {
        console.error('Error fetching message_recipients:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};


export const getMessage_recipientById = async(req, res) => {
    const { id } = req.params;
    if (!id) {
        return res.status(400).json({ error: 'Message_recipient ID is required' });
    }

    try {
        const message_recipient = await sql`
            SELECT * FROM message_recipients WHERE id = ${id}
            ORDER BY created_at DESC
        `;

        if (message_recipient.length === 0) {
            return res.status(404).json({ error: 'Message_recipient not found' });
        }

        console.log('Message_recipient fetched successfully:', message_recipient[0]);
        res.status(200).json({success: true, data: message_recipient[0]});
    } catch (error) {
        console.error('Error fetching message_recipient:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};


export const createMessage_recipient = async(req, res) => {
    const {id,message_id,recipient_id} = req.body;

    if (!id || !message_id || !recipient_id) {
        return res.status(400).json({ error: 'All fields are required' });
    }
    try {
        const newMessage_recipient = await sql`
            INSERT INTO message_recipients (id, message_id, recipient_id)
            VALUES (${id}, ${message_id}, ${recipient_id})
            RETURNING *;
        `;

        console.log('Message sent successfully:', newMessage_recipient);
        res.status(201).json({success: true, data: newMessage_recipient});
    } catch (error) {
        console.error('Error creating message_recipient:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};



export const updateMessage_recipient = async(req, res) => { 
    const { id } = req.params;
    const { message_id, recipient_id } = req.body;

    if (!id || !message_id || !recipient_id) {
        return res.status(400).json({ error: 'All fields are required' });
    }

    try {
        const updatedMessage_recipient = await sql`
            UPDATE message_recipients
            SET message_id = ${message_id}, recipient_id = ${recipient_id}
            WHERE id = ${id}
            RETURNING *;
        `;

        if (updatedMessage_recipient.length === 0) {
            return res.status(404).json({ error: 'Message_recipient not found' });
        }

        console.log('Message_recipient updated successfully:', updatedMessage_recipient[0]);
        res.status(200).json({success: true, data: updatedMessage_recipient[0]});
    } catch (error) {
        console.error('Error updating message_recipient:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};



export const deletePost = async(req, res) => {
    const { id } = req.params;

    if (!id) {
        return res.status(400).json({ error: 'Post ID is required' });
    }

    try {
        const deletedPost = await sql`
            DELETE FROM posts WHERE id = ${id} RETURNING *;
        `;

        if (deletedPost.length === 0) {
            return res.status(404).json({ error: 'Post not found' });
        }

        console.log('Post deleted successfully:', deletedPost[0]);
        res.status(200).json({success: true, data: deletedPost[0]});
    } catch (error) {
        console.error('Error deleting post:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};


export const deleteMessage_recipient = async(req, res) => {
    const { id } = req.params;

    if (!id) {
        return res.status(400).json({ error: 'Message_recipient ID is required' });
    }

    try {
        const deletedMessage_recipient = await sql`
            DELETE FROM message_recipients WHERE id = ${id} RETURNING *;
        `;

        if (deletedMessage_recipient.length === 0) {
            return res.status(404).json({ error: 'Message_recipient not found' });
        }

        console.log('Message_recipient deleted successfully:', deletedMessage_recipient[0]);
        res.status(200).json({success: true, data: deletedMessage_recipient[0]});
    } catch (error) {
        console.error('Error deleting message_recipient:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};