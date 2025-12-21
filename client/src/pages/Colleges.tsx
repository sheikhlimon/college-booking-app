import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getColleges, type College } from '../services/api';

const Colleges: React.FC = () => {
  const [allColleges, setAllColleges] = useState<College[]>([]);
  const [filteredColleges, setFilteredColleges] = useState<College[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchColleges = async () => {
      try {
        const data = await getColleges();
        setAllColleges(data);
        setFilteredColleges(data);
      } catch (error) {
        setError('Failed to load colleges');
        console.error('Error:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchColleges();
  }, []);

  // Search functionality
  useEffect(() => {
    if (!searchTerm.trim()) {
      setFilteredColleges(allColleges);
    } else {
      const filtered = allColleges.filter(college =>
        college.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredColleges(filtered);
    }
  }, [searchTerm, allColleges]);

  if (loading) {
    return (
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading colleges...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="text-center text-red-600">
          <p>{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold text-gray-900 mb-4 text-center">All Colleges</h1>
      <p className="text-xl text-gray-600 text-center mb-8">
        Find the perfect college for your future
      </p>

      {/* Search Bar */}
      <div className="mb-8">
        <div className="max-w-2xl mx-auto">
          <input
            type="text"
            placeholder="Search colleges by name..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredColleges.map((college) => (
          <div key={college._id} className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="h-48 bg-gray-200 flex items-center justify-center">
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

            <div className="p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-3">{college.name}</h3>

              <div className="space-y-2 mb-6">
                <div className="flex justify-between">
                  <span className="text-gray-600">Admission:</span>
                  <span className="font-semibold">{college.admissionDate}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Rating:</span>
                  <span className="font-semibold text-blue-600">
                    {college.rating > 0 ? `${college.rating}★` : 'Not Rated'}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Research:</span>
                  <span className="font-semibold">{college.researchCount} papers</span>
                </div>
              </div>

              <div className="space-y-2">
                <Link
                  to={`/admission?college=${college._id}`}
                  className="block w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 text-center"
                >
                  Apply Now
                </Link>
                <Link
                  to={`/colleges/${college._id}`}
                  className="block w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 text-center"
                >
                  View Details
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredColleges.length === 0 && !loading && (
        <div className="text-center mt-12">
          <p className="text-gray-500">No colleges found.</p>
        </div>
      )}
    </div>
  );
};

export default Colleges;