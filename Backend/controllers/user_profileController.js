import { sql } from '../config/db.js';


//CRUD

export const getUser_profile = async(req, res) => {
    try {
        const user_profiles = await sql`
            SELECT * FROM user_profiles 
            ORDER BY created_at DESC;
        `;
        console.log('User profiles fetched successfully:', user_profiles);
        res.status(200).json(user_profiles);
    } catch (error) {
        console.error('Error fetching user profiles:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};


export const getUser_profileById = async(req, res) => {
    const { id } = req.params;
   // if (!id) {
   //     return res.status(400).json({ error: 'Post ID is required' });
  //  }

    try {
        const user_profile = await sql`
            SELECT * FROM user_profiles WHERE id = ${id}
            ORDER BY created_at DESC
        `;

        if (user_profile.length === 0) {
            return res.status(404).json({ error: 'User profile not found' });
        }

        console.log('User profile fetched successfully:', user_profile[0]);
        res.status(200).json({success: true, data: user_profile[0]});
    } catch (error) {
        console.error('Error fetching user profile:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};


export const createUser_profile = async(req, res) => {
    const {user_id, profile_photo, username, handle} = req.body;

    if (!user_id || !profile_photo || !username || !handle) {
        return res.status(400).json({ error: 'All fields are required' });
    }
    try {
        const newUser_profile = await sql`
            INSERT INTO user_profiles (user_id, profile_photo, username, handle)
            VALUES (${user_id}, ${profile_photo}, ${username}, ${handle})
            RETURNING *;
        `;

        //console.log('Post created successfully:', newPost);
        res.status(201).json({success: true, data: newUser_profile});
    } catch (error) {
        console.error('Error creating user profile:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};


export const updateUser_profile = async(req, res) => { 
    const { id } = req.params;
    const { name, description, price, media } = req.body;

    if (!id || !name || !description || !price || !media) {
        return res.status(400).json({ error: 'All fields are required' });
    }

    try {
        const updatedUser_profile = await sql`
            UPDATE user_profiles
            SET name = ${name}, description = ${description}, price = ${price}, media = ${media}
            WHERE id = ${id}
            RETURNING *;
        `;

        if (updatedUser_profile.length === 0) {
            return res.status(404).json({ error: 'User profile not found' });
        }

        console.log('User profile updated successfully:', updatedUser_profile[0]);
        res.status(200).json({success: true, data: updatedUser_profile[0]});
    } catch (error) {
        console.error('Error updating user profile:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};


export const deleteUser_profile = async(req, res) => {
    const { id } = req.params;

    if (!id) {
        return res.status(400).json({ error: 'User profile ID is required' });
    }

    try {
        const deletedUser_profile = await sql`
            DELETE FROM user_profiles WHERE id = ${id} RETURNING *;
        `;

        if (deletedUser_profile.length === 0) {
            return res.status(404).json({ error: 'User profile not found' });
        }

        console.log('User profile deleted successfully:', deletedUser_profile[0]);
        res.status(200).json({success: true, data: deletedUser_profile[0]});
    } catch (error) {
        console.error('Error deleting user profile:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
}; 