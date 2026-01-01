import React, { useState, useEffect } from 'react';
import { FileText, Star } from 'lucide-react';
import { useAuth } from '../hooks/useAuth';
import { submitReview, getColleges, getUserAdmissions, type College, type Admission } from '../services/api';
import EmptyState from '../components/shared/EmptyState';
import SectionTitle from '../components/shared/SectionTitle';
import AdmissionCard from '../components/shared/AdmissionCard';
import ReviewForm from '../components/shared/ReviewForm';
import LoadingSpinner from '../components/shared/LoadingSpinner';

const MyCollege: React.FC = () => {
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);
  const [dataLoading, setDataLoading] = useState(true);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [colleges, setColleges] = useState<College[]>([]);
  const [selectedCollege, setSelectedCollege] = useState('');
  const [userAdmissions, setUserAdmissions] = useState<Admission[]>([]);

  useEffect(() => {
    let isMounted = true;

    const fetchData = async () => {
      setDataLoading(true);
      try {
        const [collegesData, admissionsData] = await Promise.all([
          getColleges(),
          user?.email ? getUserAdmissions(user.email) : Promise.resolve([])
        ]);

        if (!isMounted) return;

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
      } finally {
        if (isMounted) {
          setDataLoading(false);
          setLoading(false);
        }
      }
    };

    fetchData();

    return () => {
      isMounted = false;
    };
  }, [user?.email]);

  const handleReviewSubmit = async (data: { collegeId: string; rating: number; comment: string }) => {
    setLoading(true);
    setError('');
    setSuccess('');

    try {
      if (!data.collegeId) {
        setError('Please select a college');
        return;
      }

      await submitReview({
        collegeId: data.collegeId,
        userName: user?.displayName || undefined,
        userEmail: user?.email || '',
        rating: data.rating,
        comment: data.comment
      });

      setSuccess('Review submitted successfully!');
    } catch (error) {
      console.error('Review submission error:', error);
      const errorMessage = error instanceof Error ? error.message : 'Failed to submit review';
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <SectionTitle align="left">My College</SectionTitle>

      {dataLoading ? (
        <div className="text-center py-12">
          <LoadingSpinner size="lg" />
          <p className="mt-4 text-gray-600">Loading your college data...</p>
        </div>
      ) : (
        <>
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
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="bg-gradient-to-r from-emerald-600 to-teal-700 px-6 py-4">
              <h2 className="text-xl font-semibold text-white">My Applications</h2>
            </div>
            <div className="p-6">
              {userAdmissions.length > 0 ? (
                <div className="space-y-4">
                  {userAdmissions.map((admission) => (
                    <AdmissionCard key={admission._id} admission={admission} />
                  ))}
                </div>
              ) : (
                <EmptyState
                  icon={<FileText className="w-16 h-16 text-gray-300 mx-auto" />}
                  title="No Applications Found"
                  message="You haven't applied to any colleges yet."
                  action={{
                    label: 'Apply to a College',
                    onClick: () => window.location.href = '/admission'
                  }}
                />
              )}
            </div>
          </div>

          {/* Available Colleges */}
          {colleges.length > 0 && (
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="bg-gradient-to-r from-emerald-600 to-teal-700 px-6 py-4">
                <h2 className="text-xl font-semibold text-white">Available Colleges</h2>
              </div>
              <div className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {colleges.slice(0, 4).map((college) => (
                    <div key={college._id} className="p-3 border border-gray-200 rounded-lg hover:shadow-md transition-shadow bg-gray-50">
                      <p className="font-semibold text-gray-900">{college.name}</p>
                      <p className="text-sm text-gray-600 mt-1">Rating: {college.rating}<Star className="w-3 h-3 inline ml-1 text-yellow-500 fill-yellow-500" /></p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Sidebar */}
        <div>
          <ReviewForm
            colleges={colleges}
            selectedCollege={selectedCollege}
            onCollegeChange={setSelectedCollege}
            onSubmit={handleReviewSubmit}
            loading={loading}
          />
        </div>
      </div>
        </>
      )}
    </div>
  );
};

export default MyCollege;