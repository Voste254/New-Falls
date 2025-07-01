import { sql } from '../config/db.js';


//CRUD

export const getAllPosts = async(req, res) => {
    try {
        const posts = await sql`
            SELECT * FROM posts
            ORDER BY created_at DESC;
        `;
        console.log('Posts fetched successfully:', posts);
        res.status(200).json(posts);
    } catch (error) {
        console.error('Error fetching posts:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};


export const getPostById = async(req, res) => {
    const { id } = req.params;
   // if (!id) {
   //     return res.status(400).json({ error: 'Post ID is required' });
  //  }

    try {
        const post = await sql`
            SELECT * FROM posts WHERE id = ${id}
            ORDER BY created_at DESC
        `;

        if (post.length === 0) {
            return res.status(404).json({ error: 'Post not found' });
        }

        console.log('Post fetched successfully:', post[0]);
        res.status(200).json({success: true, data: post[0]});
    } catch (error) {
        console.error('Error fetching post:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};


export const createPost = async(req, res) => {
    const {name,description,price,media} = req.body;

    if (!name || !description || !price || !media) {
        return res.status(400).json({ error: 'All fields are required' });
    }
    try {
        const newPost = await sql`
            INSERT INTO posts (name, description, price, media)
            VALUES (${name}, ${description}, ${price}, ${media})
            RETURNING *;
        `;

        //console.log('Post created successfully:', newPost);
        res.status(201).json({success: true, data: newPost});
    } catch (error) {
        console.error('Error creating post:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};


export const updatePost = async(req, res) => { 
    const { id } = req.params;
    const { name, description, price, media } = req.body;

    if (!id || !name || !description || !price || !media) {
        return res.status(400).json({ error: 'All fields are required' });
    }

    try {
        const updatedPost = await sql`
            UPDATE posts
            SET name = ${name}, description = ${description}, price = ${price}, media = ${media}
            WHERE id = ${id}
            RETURNING *;
        `;

        if (updatedPost.length === 0) {
            return res.status(404).json({ error: 'Post not found' });
        }

        console.log('Post updated successfully:', updatedPost[0]);
        res.status(200).json({success: true, data: updatedPost[0]});
    } catch (error) {
        console.error('Error updating post:', error);
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
