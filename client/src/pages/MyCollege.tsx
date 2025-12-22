import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { submitReview, getColleges, getUserAdmissions, type College } from '../services/api';
import Button from '../components/Button';
import StarRating from '../components/shared/StarRating';
import EmptyState from '../components/shared/EmptyState';
import SectionTitle from '../components/shared/SectionTitle';

const MyCollege: React.FC = () => {
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [colleges, setColleges] = useState<College[]>([]);
  const [selectedCollege, setSelectedCollege] = useState('');
  const [userAdmissions, setUserAdmissions] = useState<any[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [collegesData, admissionsData] = await Promise.all([
          getColleges(),
          user?.email ? getUserAdmissions(user.email) : Promise.resolve([])
        ]);
        setColleges(collegesData);
        setUserAdmissions(admissionsData);

        // Set default college to first available or first admission
        if (admissionsData.length > 0 && admissionsData[0].collegeId) {
          const collegeId = typeof admissionsData[0].collegeId === 'object'
            ? admissionsData[0].collegeId._id
            : admissionsData[0].collegeId;
          setSelectedCollege(collegeId);
        } else if (collegesData.length > 0) {
          setSelectedCollege(collegesData[0]._id);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [user?.email]);

  const handleReviewSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');

    try {
      if (!selectedCollege) {
        setError('Please select a college');
        return;
      }

      await submitReview({
        collegeId: selectedCollege,
        userEmail: user?.email || '',
        rating,
        comment
      });

      setSuccess('Review submitted successfully!');
      setRating(5);
      setComment('');
    } catch (error: any) {
      console.error('Review submission error:', error);
      setError(error.response?.data?.message || 'Failed to submit review');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <SectionTitle align="left">My College</SectionTitle>

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6">
          {error}
        </div>
      )}

      {success && (
        <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-6">
          {success}
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-8">
          {/* Admission Info */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold mb-4">My Applications</h2>
            {userAdmissions.length > 0 ? (
              <div className="space-y-4">
                {userAdmissions.map((admission) => {
                  const college = typeof admission.collegeId === 'object' ? admission.collegeId : null;
                  return (
                    <div key={admission._id} className="border rounded-lg p-4 bg-gray-50">
                      <div className="flex justify-between items-start mb-3">
                        <div>
                          <h3 className="font-semibold text-lg">
                            {college?.name || 'College'}
                          </h3>
                          <p className="text-gray-600">Program: {admission.subject}</p>
                        </div>
                        <span className="px-3 py-1 text-sm rounded-full bg-yellow-100 text-yellow-800">
                          Under Review
                        </span>
                      </div>
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <span className="text-gray-600">Applied:</span>
                          <p className="font-medium">{new Date(admission.createdAt).toLocaleDateString()}</p>
                        </div>
                        <div>
                          <span className="text-gray-600">Email:</span>
                          <p className="font-medium">{admission.email}</p>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <EmptyState
                icon="📝"
                title="No Applications Found"
                message="You haven't applied to any colleges yet."
                action={{
                  label: 'Apply to a College',
                  onClick: () => window.location.href = '/admission'
                }}
              />
            )}
          </div>

          {/* Available Colleges */}
          {colleges.length > 0 && (
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-semibold mb-4">Available Colleges</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {colleges.slice(0, 4).map((college) => (
                  <div key={college._id} className="text-sm">
                    <p className="font-medium">{college.name}</p>
                    <p className="text-gray-600">Rating: {college.rating}★</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Review Form */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-lg font-semibold mb-4">Write a Review</h2>
            <form onSubmit={handleReviewSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  College
                </label>
                <select
                  value={selectedCollege}
                  onChange={(e) => setSelectedCollege(e.target.value)}
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
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Share your experience..."
                />
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

          {/* Quick Actions */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="font-semibold mb-4">Quick Actions</h3>
            <div className="space-y-3">
              <button className="w-full text-left px-4 py-2 border rounded hover:bg-gray-50">
                Apply to Another College
              </button>
              <button className="w-full text-left px-4 py-2 border rounded hover:bg-gray-50">
                Download Admission Letter
              </button>
              <button className="w-full text-left px-4 py-2 border rounded hover:bg-gray-50">
                Contact Support
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyCollege;