import React from 'react';
import StarRating from './StarRating';

interface Review {
  _id: string;
  userEmail: string;
  rating: number;
  comment: string;
  createdAt: string;
  collegeId: {
    _id: string;
    name: string;
    image: string;
  };
}

interface ReviewCardProps {
  review: Review;
  showCollege?: boolean;
}

const ReviewCard: React.FC<ReviewCardProps> = ({ review, showCollege = false }) => {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now.getTime() - date.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays === 1) return 'Yesterday';
    if (diffDays < 7) return `${diffDays} days ago`;
    if (diffDays < 30) return `${Math.floor(diffDays / 7)} weeks ago`;
    return date.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
  };

  const getInitials = (email: string) => {
    return email.charAt(0).toUpperCase();
  };

  const getDisplayName = (email: string) => {
    return email.split('@')[0];
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
      {/* Header with gradient */}
      <div className="bg-gradient-to-r from-emerald-600 to-teal-700 px-4 py-3 sm:px-6 sm:py-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-white/20 backdrop-blur rounded-full flex items-center justify-center text-white font-bold flex-shrink-0">
            {getInitials(review.userEmail)}
          </div>
          <div className="min-w-0 flex-1">
            <p className="font-bold text-white text-base sm:text-lg truncate">{getDisplayName(review.userEmail)}</p>
            <p className="text-emerald-100 text-xs sm:text-sm">{formatDate(review.createdAt)}</p>
          </div>
          <div className="flex-shrink-0">
            <StarRating rating={review.rating} readonly size="sm" />
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-4 sm:p-6">
        <p className="text-gray-700 leading-relaxed break-words">
          "{review.comment}"
        </p>

        {showCollege && review.collegeId && (
          <div className="mt-4 pt-4 border-t border-gray-200">
            <div className="flex items-center space-x-2 sm:space-x-3">
              <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-gray-200 overflow-hidden flex-shrink-0">
                <img
                  src={review.collegeId.image}
                  alt={review.collegeId.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-xs text-gray-500">Reviewed</p>
                <p className="text-sm font-semibold text-emerald-700 truncate">{review.collegeId.name}</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ReviewCard;
