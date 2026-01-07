import { Router } from "express";
import {
  getUserByEmail,
  updateUserByEmail,
} from "../controllers/userController";

const router = Router();

// GET /users/:email - Get user by email
router.get("/:email", getUserByEmail);

// PATCH /users/:email - Update user by email (creates if not exists)
router.patch("/:email", updateUserByEmail);

export default router;
