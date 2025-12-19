import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/db.js";

// Load env
dotenv.config();

// Connect to database
connectDB();

// Create app
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.get("/", (_req, res) => {
  res.send("College Booking API is running");
});

const PORT = process.env.PORT || 5000;

// Listen
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
