import React from 'react';
import { type Review } from '../../services/api';
import LoadingSpinner from '../shared/LoadingSpinner';
import SectionTitle from '../shared/SectionTitle';
import ReviewCard from '../shared/ReviewCard';
import EmptyState from '../shared/EmptyState';

interface StudentReviewsProps {
  reviews: Review[];
  loading: boolean;
}

const StudentReviews: React.FC<StudentReviewsProps> = ({ reviews, loading }) => {
  if (loading) {
    return (
      <div className="mb-12">
        <SectionTitle>Student Reviews</SectionTitle>
        <div className="text-center py-8">
          <LoadingSpinner />
          <p className="mt-2 text-gray-600">Loading reviews...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="mb-16">
      <SectionTitle>Student Reviews</SectionTitle>
      {reviews.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {reviews.map((review) => (
            <ReviewCard key={review._id} review={review} showCollege={true} />
          ))}
        </div>
      ) : (
        <EmptyState
          icon="⭐"
          title="No Reviews Yet"
          message="Be the first to share your experience!"
        />
      )}
    </div>
  );
};

export default StudentReviews;