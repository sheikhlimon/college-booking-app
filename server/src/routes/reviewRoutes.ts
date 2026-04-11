import { Router } from 'express';
import { createReview, getAllReviews } from '../controllers/reviewController';
import { authMiddleware } from '../middleware/auth';

const router = Router();

// POST /reviews - Create new review (requires auth)
router.post('/', authMiddleware, createReview);

// GET /reviews - Get all reviews (public)
router.get('/', getAllReviews);

export default router;