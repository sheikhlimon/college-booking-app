import { Router } from "express";
import {
  getUserByEmail,
  updateUserByEmail,
} from "../controllers/userController";
import { authMiddleware } from "../middleware/auth";

const router = Router();

// GET /users/:email - Get user by email (public)
router.get("/:email", getUserByEmail);

// PATCH /users/:email - Update user by email (requires auth)
router.patch("/:email", authMiddleware, updateUserByEmail);

export default router;
