import React, { useState } from 'react';
import Button from '../Button';
import StarRating from './StarRating';

interface College {
  _id: string;
  name: string;
}

interface ReviewFormProps {
  colleges: College[];
  selectedCollege: string;
  onCollegeChange: (collegeId: string) => void;
  onSubmit: (data: { collegeId: string; rating: number; comment: string }) => Promise<void>;
  loading?: boolean;
}

const ReviewForm: React.FC<ReviewFormProps> = ({
  colleges,
  selectedCollege,
  onCollegeChange,
  onSubmit,
  loading = false
}) => {
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await onSubmit({ collegeId: selectedCollege, rating, comment });
    setRating(5);
    setComment('');
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <div className="bg-gradient-to-r from-emerald-600 to-teal-700 px-6 py-4">
        <h2 className="text-lg font-semibold text-white">Write a Review</h2>
      </div>
      <div className="p-6">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              College
            </label>
            <select
              value={selectedCollege}
              onChange={(e) => onCollegeChange(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            >
              <option value="">Select a college</option>
              {colleges.map((college) => (
                <option key={college._id} value={college._id}>
                  {college.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Rating
            </label>
            <StarRating
              rating={rating}
              onRatingChange={setRating}
              readonly={false}
              size="lg"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Comment
            </label>
            <textarea
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              rows={4}
              maxLength={500}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Share your experience (max 500 characters)..."
            />
            <div className="mt-1 text-xs text-gray-500 text-right">
              {comment.length}/500 characters
            </div>
          </div>

          <Button
            type="submit"
            disabled={loading}
            className="w-full justify-center"
          >
            {loading ? 'Submitting...' : 'Submit Review'}
          </Button>
        </form>
      </div>
    </div>
  );
};

export default ReviewForm;
