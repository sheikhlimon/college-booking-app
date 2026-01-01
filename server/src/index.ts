import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";
import connectDB from "./config/db";
import collegeRoutes from "./routes/collegeRoutes";
import admissionRoutes from "./routes/admissionRoutes";
import reviewRoutes from "./routes/reviewRoutes";
import userRoutes from "./routes/userRoutes";
import researchPaperRoutes from "./routes/researchPaperRoutes";

// Load env
dotenv.config();

// Create app
const app = express();

// Middleware
app.use(cors());
app.use(express.json());


// API Routes
app.use("/api/colleges", collegeRoutes);
app.use("/api/admissions", admissionRoutes);
app.use("/api/reviews", reviewRoutes);
app.use("/api/users", userRoutes);
app.use("/api/papers", researchPaperRoutes);

// Root route
app.get("/", (_req, res) => {
  res.send("College Booking API is running");
});

const PORT = process.env.PORT || 5000;

// Health check endpoint
app.get("/health", (_req, res) => {
  const dbState = mongoose.connection.readyState;
  const status = dbState === 1 ? "connected" : "disconnected";
  res.json({ status });
});

// Connect to database then start server
const startServer = async () => {
  try {
    await connectDB();
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (error) {
    console.error("Failed to start server:", error);
    process.exit(1);
  }
};

startServer();
