import { Router } from 'express';
import { updateUserByEmail } from '../controllers/userController';

const router = Router();

// PATCH /users/:email - Update user by email
router.patch('/:email', updateUserByEmail);

export default router;