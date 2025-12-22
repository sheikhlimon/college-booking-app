import { Request, Response } from 'express';
import Review from '../models/Review';

export const createReview = async (req: Request, res: Response): Promise<void> => {
  try {
    // Extract review data from request body
    const { collegeId, userEmail, rating, comment } = req.body;

    // Validate rating range (1-5)
    if (rating < 1 || rating > 5) {
      res.status(400).json({ message: 'Rating must be between 1 and 5' });
      return;
    }

    // Create and save new review
    const review = new Review({
      collegeId,
      userEmail,
      rating,
      comment
    });

    const savedReview = await review.save();

    // Return created review with 201 status
    res.status(201).json(savedReview);
  } catch (error: any) {
    console.error('Review creation error:', error);

    // Handle validation errors
    if (error.name === 'ValidationError') {
      const messages = Object.values(error.errors).map((e: any) => e.message);
      res.status(400).json({ message: messages.join(', ') });
      return;
    }

    res.status(500).json({ message: 'Server error' });
  }
};

export const getAllReviews = async (req: Request, res: Response): Promise<void> => {
  try {
    // Get all reviews with selective population and sorting
    const reviews = await Review.find()
      .populate('collegeId', 'name image') // Only fetch name and image
      .sort({ createdAt: -1 }); // Sort newest first

    res.json(reviews);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};