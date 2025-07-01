import { sql } from '../config/db.js';


//CRUD

export const getAllMessages = async(req, res) => {
    try {
        const messages = await sql`
            SELECT * FROM messages
            ORDER BY created_at DESC;
        `;
        console.log('Messages fetched successfully:', messages);
        res.status(200).json(messages);
    } catch (error) {
        console.error('Error fetching messages:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};


export const getMessageById = async(req, res) => {
    const { id } = req.params;
    if (!id) {
        return res.status(400).json({ error: 'Message ID is required' });
    }

    try {
        const message = await sql`
            SELECT * FROM messages WHERE id = ${id}
            ORDER BY created_at DESC
        `;

        if (message.length === 0) {
            return res.status(404).json({ error: 'Message not found' });
        }

        console.log('Message fetched successfully:', message[0]);
        res.status(200).json({success: true, data: message[0]});
    } catch (error) {
        console.error('Error fetching message:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};


export const createMessage = async(req, res) => {
    const {id,sender_id,text,sent_at} = req.body;

    if (!id || !sender_id || !text || !sent_at) {
        return res.status(400).json({ error: 'All fields are required' });
    }
    try {
        const newMessage = await sql`
            INSERT INTO messages (id, sender_id, text, sent_at)
            VALUES (${id}, ${sender_id}, ${text}, ${sent_at})
            RETURNING *;
        `;

        console.log('  New Message:', newMessage);
        res.status(201).json({success: true, data: newMessage});
    } catch (error) {
        console.error('Error creating message:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};


export const updateMessage = async(req, res) => { 
    const { id } = req.params;
    const { sender_id, text, sent_at } = req.body;

    if (!id || !sender_id || !text || !sent_at) {
        return res.status(400).json({ error: 'All fields are required' });
    }

    try {
        const updatedMessage = await sql`
            UPDATE messages
            SET sender_id = ${sender_id}, text = ${text}, sent_at = ${sent_at}
            WHERE id = ${id}
            RETURNING *;
        `;

        if (updatedMessage.length === 0) {
            return res.status(404).json({ error: 'Message not found' });
        }

        console.log('Message updated successfully:', updatedMessage[0]);
        res.status(200).json({success: true, data: updatedMessage[0]});
    } catch (error) {
        console.error('Error updating message:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};


export const deleteMessage = async(req, res) => {
    const { id } = req.params;

    if (!id) {
        return res.status(400).json({ error: 'Message ID is required' });
    }

    try {
        const deletedMessage = await sql`
            DELETE FROM messages WHERE id = ${id} RETURNING *;
        `;

        if (deletedMessage.length === 0) {
            return res.status(404).json({ error: 'Message not found' });
        }

        console.log('Message deleted successfully:', deletedMessage[0]);
        res.status(200).json({success: true, data: deletedMessage [0]});
    } catch (error) {
        console.error('Error deleting message:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};  