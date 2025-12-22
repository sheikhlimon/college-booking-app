import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { getColleges, submitAdmission, type College } from '../services/api';
import { useAuth } from '../context/AuthContext';
import PrivateRoute from '../components/PrivateRoute';

const Admission: React.FC = () => {
  const [searchParams] = useSearchParams();
  const { user } = useAuth();
  const navigate = useNavigate();

  const [colleges, setColleges] = useState<College[]>([]);
  const [selectedCollege, setSelectedCollege] = useState<College | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [collegesLoading, setCollegesLoading] = useState(true);

  useEffect(() => {
    fetchColleges();

    // If college is pre-selected via URL parameter, set it
    const collegeId = searchParams.get('college');
    if (collegeId) {
      fetchCollegeById(collegeId);
    }
  }, [searchParams]);

  const fetchColleges = async () => {
    try {
      const data = await getColleges();
      setColleges(data);
      setCollegesLoading(false);
    } catch (error) {
      setError('Failed to load colleges');
      setCollegesLoading(false);
    }
  };

  const fetchCollegeById = async (collegeId: string) => {
    try {
      const data = await getColleges();
      const college = data.find(c => c._id === collegeId);
      if (college) {
        setSelectedCollege(college);
      }
    } catch (error) {
      setError('Failed to load college');
    }
  };

  const handleCollegeSelect = (college: College) => {
    setSelectedCollege(college);
  };

  const handleBackToColleges = () => {
    setSelectedCollege(null);
    setError('');
    setSuccess('');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    const formData = new FormData(e.target as HTMLFormElement);

    try {
      await submitAdmission({
        candidateName: formData.get('candidateName') as string,
        subject: formData.get('subject') as string,
        email: user?.email || formData.get('email') as string,
        phone: formData.get('phone') as string,
        address: formData.get('address') as string,
        dob: formData.get('dob') as string,
        image: formData.get('image') as string || 'default-image.jpg',
        collegeId: selectedCollege?._id || ''
      });

      setSuccess('Application submitted successfully!');
      setTimeout(() => {
        navigate('/my-college');
      }, 2000);

    } catch (error: any) {
      setError(error.message || 'Failed to submit application');
    } finally {
      setLoading(false);
    }
  };

  return (
    <PrivateRoute>
      <div className="max-w-4xl mx-auto p-6">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">College Admission</h1>

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

        {!selectedCollege ? (
          // College Selection View
          <div>
            <h2 className="text-xl font-semibold mb-6">Select a College to Apply</h2>

            {collegesLoading ? (
              <div className="text-center py-8">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
                <p className="mt-4 text-gray-600">Loading colleges...</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {colleges.map((college) => (
                  <div
                    key={college._id}
                    onClick={() => handleCollegeSelect(college)}
                    className="bg-white rounded-lg shadow-md overflow-hidden cursor-pointer hover:shadow-lg transition-shadow duration-300"
                  >
                    <div className="h-32 bg-gray-200 flex items-center justify-center">
                      {college.image ? (
                        <img
                          src={college.image}
                          alt={college.name}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <span className="text-gray-500">{college.name}</span>
                      )}
                    </div>
                    <div className="p-4">
                      <h3 className="text-lg font-semibold mb-2">{college.name}</h3>
                      <p className="text-gray-600 mb-2">Admission: {college.admissionDate}</p>
                      <p className="text-gray-600 mb-3">Rating: {college.rating > 0 ? `${college.rating}★` : 'Not Rated'}</p>
                      <div className="text-blue-600 font-medium">
                        Click to Apply →
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        ) : (
          // Admission Form View
          <div>
            <button
              onClick={handleBackToColleges}
              className="mb-6 text-blue-600 hover:text-blue-800 flex items-center"
            >
              ← Back to College Selection
            </button>

            <div className="bg-white rounded-lg shadow-md p-6 mb-6">
              <h2 className="text-xl font-semibold mb-4">
                Applying to: {selectedCollege.name}
              </h2>
            </div>

            <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-md p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Candidate Name *
                  </label>
                  <input
                    type="text"
                    name="candidateName"
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter your full name"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Subject *
                  </label>
                  <input
                    type="text"
                    name="subject"
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Program/Subject you're applying for"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email *
                  </label>
                  <input
                    type="email"
                    name="email"
                    required
                    defaultValue={user?.email || ''}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="your.email@example.com"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Phone Number *
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="+1234567890"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Date of Birth *
                  </label>
                  <input
                    type="date"
                    name="dob"
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Profile Image URL
                  </label>
                  <input
                    type="url"
                    name="image"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="https://example.com/your-photo.jpg"
                  />
                </div>
              </div>

              <div className="mt-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Address *
                </label>
                <textarea
                  name="address"
                  rows={4}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter your full address"
                />
              </div>

              <div className="mt-8 flex justify-end">
                <button
                  type="submit"
                  disabled={loading}
                  className="bg-blue-600 text-white px-8 py-3 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50"
                >
                  {loading ? 'Submitting...' : 'Submit Application'}
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </PrivateRoute>
  );
};

export default Admission;