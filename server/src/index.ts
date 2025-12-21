import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/db";
import collegeRoutes from "./routes/collegeRoutes";
import admissionRoutes from "./routes/admissionRoutes";
import reviewRoutes from "./routes/reviewRoutes";
import userRoutes from "./routes/userRoutes";

// Load env
dotenv.config();

// Connect to database
connectDB();

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

// Root route
app.get("/", (_req, res) => {
  res.send("College Booking API is running");
});

const PORT = process.env.PORT || 5000;

// Listen
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
