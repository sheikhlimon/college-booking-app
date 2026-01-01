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
  const isHealthy = dbState === 1 || dbState === 2;
  res.status(isHealthy ? 200 : 503).json({
    status: isHealthy ? "healthy" : "unhealthy",
    db: dbState === 1 ? "connected" : dbState === 2 ? "connecting" : "disconnected",
  });
});

// Connect to database then start server
connectDB()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.error("Failed to connect to database:", error);
    process.exit(1);
  });
