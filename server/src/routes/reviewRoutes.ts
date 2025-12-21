import { Router } from 'express';
import { createReview, getAllReviews } from '../controllers/reviewController';

const router = Router();

// POST /reviews - Create new review
router.post('/', createReview);

// GET /reviews - Get all reviews
router.get('/', getAllReviews);

export default router;