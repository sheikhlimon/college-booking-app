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
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-emerald-600 mx-auto"></div>
          <p className="mt-2 text-gray-600">Loading reviews...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="mb-16">
      <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">Student Reviews</h2>
      {reviews.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {reviews.map((review) => (
            <div key={review._id} className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
              {/* Review Header */}
              <div className="bg-gradient-to-r from-emerald-600 to-teal-700 p-6 text-white">
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-white/20 backdrop-blur rounded-full flex items-center justify-center text-white font-bold text-lg">
                    {review.userEmail[0].toUpperCase()}
                  </div>
                  <div className="ml-4">
                    <h3 className="font-bold text-lg">{review.userEmail.split('@')[0]}</h3>
                    <p className="text-emerald-100 text-sm">{review.collegeId?.name || 'College'}</p>
                  </div>
                </div>
              </div>

              {/* Review Content */}
              <div className="p-6">
                {/* Rating */}
                <div className="flex items-center mb-4">
                  <div className="flex text-yellow-400">
                    {[...Array(5)].map((_, i) => (
                      <svg
                        key={i}
                        className={`w-5 h-5 ${i < review.rating ? 'text-yellow-400' : 'text-gray-300'}`}
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                  <span className="ml-2 text-sm font-medium text-gray-700">{review.rating}.0</span>
                </div>

                {/* Review Comment */}
                <blockquote className="text-gray-700 leading-relaxed mb-4">
                  "{review.comment}"
                </blockquote>

                {/* Review Date */}
                <div className="text-sm text-gray-500">
                  {new Date(review.createdAt).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-12 bg-white rounded-xl shadow-md">
          <div className="text-6xl mb-4">⭐</div>
          <p className="text-gray-500 text-lg">No reviews yet.</p>
          <p className="text-gray-400 mt-2">Be the first to share your experience!</p>
        </div>
      )}
    </div>
  );
};

export default StudentReviews;