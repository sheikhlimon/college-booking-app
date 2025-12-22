import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { getColleges, submitAdmission, type College } from '../services/api';
import { useAuth } from '../context/AuthContext';
import PrivateRoute from '../components/PrivateRoute';
import { Calendar, Star, ArrowLeft, ChevronRight } from 'lucide-react';

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
      <div className="max-w-4xl mx-auto px-4 py-8">
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
                    className="bg-white rounded-lg shadow-md overflow-hidden cursor-pointer hover:shadow-lg transition-shadow duration-300 group"
                  >
                    <div className="h-40 bg-gray-200 flex items-center justify-center overflow-hidden">
                      {college.image ? (
                        <img
                          src={college.image}
                          alt={college.name}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      ) : (
                        <span className="text-gray-500">{college.name}</span>
                      )}
                    </div>
                    <div className="p-5">
                      <h3 className="text-lg font-bold mb-2 text-gray-900">{college.name}</h3>
                      <div className="space-y-2 mb-3">
                        <div className="flex items-center text-sm text-gray-600">
                          <Calendar className="w-4 h-4 mr-2 text-emerald-600" />
                          {college.admissionDate}
                        </div>
                        <div className="flex items-center text-sm text-gray-600">
                          <Star className="w-4 h-4 mr-2 text-yellow-500 fill-yellow-500" />
                          {college.rating > 0 ? `${college.rating} Rating` : 'Not Rated'}
                        </div>
                      </div>
                      <div className="text-emerald-600 font-semibold flex items-center group-hover:text-emerald-700">
                        Apply Now
                        <ChevronRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
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
              className="mb-6 text-emerald-600 hover:text-emerald-700 flex items-center font-semibold"
            >
              <ArrowLeft className="w-5 h-5 mr-1" />
              Back to College Selection
            </button>

            <div className="bg-white rounded-lg shadow-md overflow-hidden mb-6">
              <div className="bg-gradient-to-r from-emerald-600 to-teal-700 px-6 py-4">
                <h2 className="text-xl font-semibold text-white">
                  Applying to: {selectedCollege.name}
                </h2>
              </div>
              <div className="p-6">
                <div className="flex items-center space-x-4">
                  <img
                    src={selectedCollege.image}
                    alt={selectedCollege.name}
                    className="w-16 h-16 rounded-lg object-cover"
                  />
                  <div>
                    <p className="text-sm text-gray-600">Next Admission Date</p>
                    <p className="text-lg font-bold text-emerald-700">{selectedCollege.admissionDate}</p>
                  </div>
                </div>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="bg-gradient-to-r from-emerald-600 to-teal-700 px-6 py-4">
                <h2 className="text-xl font-semibold text-white">Application Form</h2>
              </div>
              <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Candidate Name *
                  </label>
                  <input
                    type="text"
                    name="candidateName"
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500"
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
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500"
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
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500"
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
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500"
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
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Profile Image URL
                  </label>
                  <input
                    type="url"
                    name="image"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500"
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
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  placeholder="Enter your full address"
                />
              </div>

              <div className="mt-8 flex justify-end">
                <button
                  type="submit"
                  disabled={loading}
                  className="bg-gradient-to-r from-emerald-600 to-teal-700 text-white px-8 py-3 rounded-md hover:from-emerald-700 hover:to-teal-800 focus:outline-none focus:ring-2 focus:ring-emerald-500 disabled:opacity-50 transition-all"
                >
                  {loading ? 'Submitting...' : 'Submit Application'}
                </button>
              </div>
              </div>
            </form>
          </div>
        )}
      </div>
    </PrivateRoute>
  );
};

export default Admission;