import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getCollegeById, type College } from '../services/api';

const CollegeDetails: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [college, setCollege] = useState<College | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!id) return;

    const fetchCollege = async () => {
      try {
        const data = await getCollegeById(id);
        setCollege(data);
      } catch (error) {
        setError('Failed to load college details');
        console.error('Error:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchCollege();
  }, [id]);

  if (loading) {
    return (
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading college details...</p>
        </div>
      </div>
    );
  }

  if (error || !college) {
    return (
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="text-center text-red-600">
          <p>{error || 'College not found'}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-2">{college.name}</h1>
        <p className="text-xl text-gray-600">Rating: {college.rating > 0 ? `${college.rating}★` : 'Not Rated'}</p>
      </div>

      <div className="bg-gray-200 h-64 rounded-lg mb-8 flex items-center justify-center overflow-hidden">
        {college.image ? (
          <img
            src={college.image}
            alt={college.name}
            className="w-full h-full object-cover"
          />
        ) : (
          <span className="text-gray-500 text-lg">Campus Image</span>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          {/* Admission Info */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Admission Information</h2>
            <p className="text-gray-700 mb-4">
              <strong>Admission Date:</strong> {college.admissionDate}
            </p>
          </div>

          {/* Events */}
          {college.events && college.events.length > 0 && (
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Upcoming Events</h2>
              <div className="space-y-3">
                {college.events.map((event, index) => (
                  <div key={index} className="border-l-4 border-blue-600 pl-4 py-2">
                    <h3 className="font-semibold">{event}</h3>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Sports */}
          {college.sports && college.sports.length > 0 && (
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Sports Facilities</h2>
              <div className="grid grid-cols-2 gap-3">
                {college.sports.map((sport, index) => (
                  <div key={index} className="bg-blue-50 rounded p-3 text-center">
                    <p className="font-medium text-blue-800">{sport}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Gallery */}
          {college.gallery && college.gallery.length > 0 && (
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Campus Gallery</h2>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {college.gallery.slice(0, 6).map((image, index) => (
                  <div key={index} className="aspect-square bg-gray-200 rounded-lg overflow-hidden">
                    {image ? (
                      <img
                        src={image}
                        alt={`Gallery ${index + 1}`}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-gray-500">
                        Image {index + 1}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="font-bold text-lg mb-4">Apply Now</h3>
            <div className="space-y-3">
              <button
                onClick={() => navigate(`/admission?college=${college._id}`)}
                className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700"
              >
                Apply for Admission
              </button>
              <button className="w-full border border-gray-300 text-gray-700 py-3 rounded-lg hover:bg-gray-50">
                Download Brochure
              </button>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="font-bold text-lg mb-4">Sports</h3>
            <div className="space-y-2">
              {college.sports.map((sport, index) => (
                <div key={index} className="text-gray-700">
                  • {sport}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CollegeDetails;