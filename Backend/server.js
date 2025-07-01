import express from "express"
import helmet from "helmet";
import morgan from "morgan";
import cors from "cors";
import dotenv from "dotenv";

import userRoutes from "./routes/usertRoutes.js";
import user_profileRoutes from "./routes/user_profileRoutes.js";
import postRoutes from "./routes/postRoutes.js";
import commentRoutes from "./routes/commentRoutes.js";
import followRoutes from "./routes/followRoutes.js";
import vroomRoutes from "./routes/vroomRoutes.js";
import vroom_postRoutes from "./routes/vroom_postRoutes.js";
import reactionRoutes from "./routes/reactionRoutes.js";
import cartRoutes from "./routes/cartRoutes.js";
import cart_itemRoutes from "./routes/cart_itemRoutes.js";
import messageRoutes from "./routes/messageRoutes.js";
import message_recipientRoutes from "./routes/message_recipientRoutes.js";


// Import necessary modules and routes
import { sql } from "./config/db.js"; // Import the SQL connection
import { aj } from "./lib/arcjet.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(express.json()); // Parse incoming JSON requests
app.use(cors()); // Enable CORS for all routes
app.use(helmet()); // Security middleware that helps you protect your app by setting variouse HTTP headers
app.use(morgan("dev")); // HTTP request logger middleware for node.js


// apply arcjet rate-limit to all routes
app.use(async (req, resizeBy,next) =>{
    try {
        const decision = await aj.protect(req,{
            requested: 1, //specifies that each request consumes 1 token
        });

        if (decision.isDenied()){
            if(decision.reason.isRateLimit()){
                res.status(429).json({error:"Too many Requests"});
            } else if (decision.reason.isBot()){
                res.status(403).json({error:"Bot access denied"});
            } else {
                res.status(403).json({error:"Forbidden"});
            }
            return
        }

        //check for spoofed bots
        if (decision.results.some((result) => result.reason.isBot() && result.reason.isSpoofed())) {
            res.status(403).json({error: "spoofed bot detected"});
            return;
        }

      next()  
    } catch (error) {
        console.log("Arcjet error", error);
        next(error);
    }
});


// Routes
app.use("/api/users", userRoutes);
app.use("/api/user_profiles", user_profileRoutes);
app.use("/api/posts", postRoutes);
app.use("/api/comments", commentRoutes);
app.use("/api/follows", followRoutes);
app.use("/api/vrooms", vroomRoutes);
app.use("/api/vroom_posts", vroom_postRoutes);
app.use("/api/reactions", reactionRoutes);
app.use("/api/carts", cartRoutes);
app.use("/api/cart_items", cart_itemRoutes);
app.use("/api/messages", messageRoutes);
app.use("/api/message_recipients", message_recipientRoutes);


async function initDB() {
  try {
    await sql`
      CREATE TABLE IF NOT EXISTS users (
        id SERIAL PRIMARY KEY,
        first_name VARCHAR(100) NOT NULL,
        last_name VARCHAR(100) NOT NULL,
        Gender VARCHAR(50) NOT NULL,
        email VARCHAR(255) UNIQUE NOT NULL,
        country VARCHAR(100) NOT NULL,
        contact INT(15) NOT NULL,
        password_hash TEXT NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );

      CREATE TABLE IF NOT EXISTS user_profiles (
        user_id INTEGER PRIMARY KEY REFERENCES users(id) ON DELETE CASCADE,
        profile_photo TEXT,
        username VARCHAR(50) UNIQUE,
        handle VARCHAR(50) UNIQUE
      );

      CREATE TABLE IF NOT EXISTS posts (
        id SERIAL PRIMARY KEY,
        user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
        name TEXT,
        description TEXT,
        price NUMERIC(10,2),
        media TEXT,
        likes_count INTEGER DEFAULT 0,
        bookmarks_count INTEGER DEFAULT 0,
        shares_count INTEGER DEFAULT 0,
        is_available BOOLEAN DEFAULT TRUE,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );

      CREATE TABLE IF NOT EXISTS comments (
        id SERIAL PRIMARY KEY,
        post_id INTEGER REFERENCES posts(id) ON DELETE CASCADE,
        user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
        text TEXT NOT NULL,
        parent_comment_id INTEGER REFERENCES comments(id) ON DELETE CASCADE,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );

      CREATE TABLE IF NOT EXISTS follows (
        id SERIAL PRIMARY KEY,
        follower_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
        following_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        UNIQUE (follower_id, following_id)
      );

      CREATE TABLE IF NOT EXISTS vrooms (
        id SERIAL PRIMARY KEY,
        user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
        name VARCHAR(100),
        description TEXT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );

      CREATE TABLE IF NOT EXISTS vroom_posts (
        id SERIAL PRIMARY KEY,
        vroom_id INTEGER REFERENCES vrooms(id) ON DELETE CASCADE,
        post_id INTEGER REFERENCES posts(id) ON DELETE CASCADE,
        added_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        UNIQUE (vroom_id, post_id)
      );

      CREATE TABLE IF NOT EXISTS reactions (
        id SERIAL PRIMARY KEY,
        user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
        post_id INTEGER REFERENCES posts(id) ON DELETE CASCADE,
        vroom_id INTEGER REFERENCES vrooms(id) ON DELETE CASCADE,
        reaction_type VARCHAR(20),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );

      CREATE TABLE IF NOT EXISTS carts (
        id SERIAL PRIMARY KEY,
        user_id INTEGER UNIQUE REFERENCES users(id) ON DELETE CASCADE,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );

      CREATE TABLE IF NOT EXISTS cart_items (
        id SERIAL PRIMARY KEY,
        cart_id INTEGER REFERENCES carts(id) ON DELETE CASCADE,
        post_id INTEGER REFERENCES posts(id) ON DELETE CASCADE,
        quantity INTEGER DEFAULT 1 CHECK (quantity > 0),
        added_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        UNIQUE (cart_id, post_id)
      );

      CREATE TABLE IF NOT EXISTS messages (
        id SERIAL PRIMARY KEY,
        sender_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
        text TEXT NOT NULL,
        sent_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );

      CREATE TABLE IF NOT EXISTS message_recipients (
        id SERIAL PRIMARY KEY,
        message_id INTEGER REFERENCES messages(id) ON DELETE CASCADE,
        recipient_id INTEGER REFERENCES users(id) ON DELETE CASCADE
      );
    `;

    console.log("All database tables initialized successfully.");
  } catch (error) {
    console.error("Error initializing database:", error);
  }
}


initDB().then(() => {
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });


});
