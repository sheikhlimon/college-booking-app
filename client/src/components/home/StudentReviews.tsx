import React from 'react';
import { type Review } from '../../services/api';

interface StudentReviewsProps {
  reviews: Review[];
  loading: boolean;
}

const StudentReviews: React.FC<StudentReviewsProps> = ({ reviews, loading }) => {
  if (loading) {
    return (
      <div className="mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Student Reviews</h2>
        <div className="text-center py-8">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-2 text-gray-600">Loading reviews...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="mb-12">
      <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Student Reviews</h2>
      {reviews.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {reviews.map((review) => (
            <div key={review._id} className="bg-white rounded-lg shadow-md p-6">
              <div className="flex items-center mb-3">
                <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center text-white font-semibold">
                  {review.userEmail[0].toUpperCase()}
                </div>
                <div className="ml-3">
                  <p className="font-semibold">{review.userEmail.split('@')[0]}</p>
                  <p className="text-sm text-gray-600">{review.collegeId?.name || 'College'}</p>
                </div>
              </div>
              <div className="flex mb-2">
                {[...Array(5)].map((_, i) => (
                  <span key={i} className={i < review.rating ? "text-yellow-400" : "text-gray-300"}>
                    ★
                  </span>
                ))}
              </div>
              <p className="text-gray-700 text-sm">{review.comment}</p>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-8">
          <p className="text-gray-500">No reviews yet. Be the first to share your experience!</p>
        </div>
      )}
    </div>
  );
};

export default StudentReviews;