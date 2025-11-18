import express from "express";
import cors from "cors";
import mongoose from "mongoose";

import userRoutes from "./routes/user.route.js";
import postRoutes from "./routes/post.route.js";
import commentRoutes from "./routes/comment.route.js";
import notificationRoutes from "./routes/notification.route.js";

import { clerkMiddleware } from "@clerk/express";
import { arcjetMiddleware } from "./middleware/arcjet.middleware.js";

import dotenv from "dotenv";

// Load environment variables
dotenv.config();

const app = express();

// MongoDB connection
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL);
    console.log(`Connected to MongoDB successfully`);
  } catch (error) {
    console.log(`Error connecting to DB ${error}`);
  }
};

// Middlewares
app.use(cors());
app.use(express.json());

app.use(clerkMiddleware());
app.use(arcjetMiddleware);

// Test route
app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Welcome to X App",
  });
});

// Routes
app.use("/api/users", userRoutes);
app.use("/api/posts", postRoutes);
app.use("/api/notifications", notificationRoutes);
app.use("/api/comments", commentRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error("Unhandled error:", err);
  res.status(500).json({ error: err.message || "Internal server error" });
});

// Vercel serverless function handler
export default async function handler(req, res) {
  // Connect to database on first request
  if (mongoose.connection.readyState === 0) {
    await connectDB();
  }
  
  // Forward to Express app
  return app(req, res);
}

// Local development server (only runs locally)
if (process.env.NODE_ENV !== "production") {
  const startServer = async () => {
    try {
      await connectDB();
      app.listen(process.env.PORT, () => console.log("Server is up and running on PORT:", process.env.PORT));
    } catch (error) {
      console.error("Failed to start server:", error.message);
      process.exit(1);
    }
  };
  
  startServer();
}