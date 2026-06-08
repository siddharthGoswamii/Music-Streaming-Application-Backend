import express, { type Request, type Response } from "express";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

// Initialize database connection
import "./config/db";

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

// Health Check Route
app.get("/", (req: Request, res: Response) => {
  res.status(200).json({
    success: true,
    service: "Auth Service",
    message: "Auth Service Running Successfully",
  });
});

// Start Server
app.listen(PORT, () => {
  console.log(`🚀 Auth Service running on port ${PORT}`);
});

// Made with Bob
