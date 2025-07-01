import { sql } from '../config/db.js';


//CRUD

export const getAllUsers = async(req, res) => {
    try {
        const users = await sql`
            SELECT * FROM users
            ORDER BY created_at DESC;
        `;
        console.log('users fetched successfully:', users);
        res.status(200).json(users);
    } catch (error) {
        console.error('Error fetching users:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};


export const getUserById = async(req, res) => {
    const { id } = req.params;
    if (!id) {
        return res.status(400).json({ error: 'User ID is required' });
    }

    try {
        const user = await sql`
            SELECT * FROM users WHERE id = ${id}
            ORDER BY created_at DESC
        `;

        if (user.length === 0) {
            return res.status(404).json({ error: 'User not found' });
        }

        console.log('User fetched successfully:', user[0]);
        res.status(200).json({success: true, data: user[0]});
    } catch (error) {
        console.error('Error fetching post:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};


export const createUser = async(req, res) => {
    const {first_name,last_name,gender,email,country,contact, password_hash} = req.body;

    if (!first_name || !last_name || !gender || !email || !country || !contact  || !password_hash) {
        return res.status(400).json({ error: 'All fields are required' });
    }
    try {
        const newUser = await sql`
            INSERT INTO posts (first_name,last_name,gender,email,country,password_hash)
            VALUES (${first_name}, ${last_name}, ${gender}, ${email}, ${country}, ${contact}, ${password_hash})
            RETURNING *;
        `;

        //console.log('Post created successfully:', newPost);
        res.status(201).json({success: true, data: newUser});
    } catch (error) {
        console.error('Error creating user:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};


export const updateUser = async(req, res) => { 
    const { id } = req.params;
    const { first_name,last_name,gender,email,country,contact, password_hash } = req.body;

    if (!first_name || !last_name || !gender || !email || !country || !contact  || !password_hash) {
        return res.status(400).json({ error: 'All fields are required' });
    }

    try {
        const updatedUser = await sql`
            UPDATE users
            SET first_name = ${first_name}, last_name = ${last_name}, gender = ${gender}, email = ${email}, contact = ${contact}, password_hash = ${password_hash}
            WHERE id = ${id}
            RETURNING *;
        `;

        if (updatedUser.length === 0) {
            return res.status(404).json({ error: 'User not found' });
        }

        console.log('User updated successfully:', updatedUser[0]);
        res.status(200).json({success: true, data: updatedUser[0]});
    } catch (error) {
        console.error('Error updating post:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};


export const deleteUser = async(req, res) => {
    const { id } = req.params;

    if (!id) {
        return res.status(400).json({ error: 'Post ID is required' });
    }

    try {
        const deletedUser = await sql`
            DELETE FROM users WHERE id = ${id} RETURNING *;
        `;

        if (deletedUser.length === 0) {
            return res.status(404).json({ error: 'User not found' });
        }

        console.log('User deleted successfully:', deletedUser[0]);
        res.status(200).json({success: true, data: deletedUser[0]});
    } catch (error) {
        console.error('Error deleting user:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};  