import React, { useState, useEffect } from 'react';
import { getAllReviews, getColleges, type Review, type College } from '../services/api';
import SearchSection from '../components/home/SearchSection';
import CampusGallery from '../components/home/CampusGallery';
import ResearchPapers from '../components/home/ResearchPapers';
import StudentReviews from '../components/home/StudentReviews';

const Home: React.FC = () => {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [allColleges, setAllColleges] = useState<College[]>([]);
  const [filteredColleges, setFilteredColleges] = useState<College[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [reviewsData, collegesData] = await Promise.all([
          getAllReviews(),
          getColleges()
        ]);
        setReviews(reviewsData);
        setAllColleges(collegesData);
        setFilteredColleges(collegesData.slice(0, 3));
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Search functionality
  useEffect(() => {
    if (!searchTerm.trim()) {
      setFilteredColleges(allColleges.slice(0, 3));
    } else {
      const filtered = allColleges.filter(college =>
        college.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredColleges(filtered);
    }
  }, [searchTerm, allColleges]);

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Section 1: Search Field */}
      <div className="mb-12">
        <h1 className="text-4xl font-bold text-center text-gray-900 mb-8">Find Your Perfect College</h1>
        <SearchSection searchTerm={searchTerm} onSearchChange={setSearchTerm} />
      </div>

      {/* Section 2: College Cards (3 with enhanced details) */}
      <section className="mb-16">
        <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">Featured Colleges</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredColleges.map((college) => (
            <div key={college._id} className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
              {/* College Image */}
              <div className="h-56 bg-gradient-to-br from-gray-200 to-gray-300 relative overflow-hidden">
                {college.image ? (
                  <img
                    src={college.image}
                    alt={college.name}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <span className="text-gray-500 text-lg font-medium">{college.name}</span>
                  </div>
                )}
              </div>

              {/* College Details */}
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-3">{college.name}</h3>

                {/* Admission Date */}
                <div className="mb-3">
                  <span className="text-sm text-gray-600">Admission: </span>
                  <span className="text-sm font-semibold text-blue-600">{college.admissionDate}</span>
                </div>

                {/* Events */}
                <div className="mb-3">
                  <h4 className="text-sm font-semibold text-gray-700 mb-2">Events</h4>
                  <div className="flex flex-wrap gap-1">
                    {college.events.slice(0, 2).map((event, index) => (
                      <span
                        key={index}
                        className="px-2 py-1 bg-purple-100 text-purple-700 text-xs rounded-full"
                      >
                        {event}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Research & Sports */}
                <div className="grid grid-cols-2 gap-3 mb-4">
                  <div className="bg-blue-50 rounded-lg p-3 text-center">
                    <p className="text-lg font-bold text-blue-800">{college.researchCount}</p>
                    <p className="text-xs text-blue-600">Research Papers</p>
                  </div>
                  <div className="bg-green-50 rounded-lg p-3 text-center">
                    <p className="text-lg font-bold text-green-800">{college.sports.length}</p>
                    <p className="text-xs text-green-600">Sports Categories</p>
                  </div>
                </div>

                {/* Sports */}
                <div className="mb-4">
                  <h4 className="text-sm font-semibold text-gray-700 mb-2">Sports</h4>
                  <div className="flex flex-wrap gap-1">
                    {college.sports.slice(0, 3).map((sport, index) => (
                      <span
                        key={index}
                        className="px-2 py-1 bg-green-100 text-green-700 text-xs rounded"
                      >
                        {sport}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Rating */}
                <div className="flex items-center mb-4">
                  <div className="flex text-yellow-400">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <svg
                        key={star}
                        className={`w-4 h-4 ${star <= Math.floor(college.rating) ? 'text-yellow-400' : 'text-gray-300'}`}
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                  <span className="ml-2 text-sm font-medium text-gray-700">{college.rating}</span>
                </div>

                {/* Details Button */}
                <div className="flex space-x-3">
                  <a
                    href={`/colleges/${college._id}`}
                    className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors text-center font-medium"
                  >
                    View Details
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Section 3: College Image Gallery */}
      <section className="mb-16">
        <CampusGallery colleges={allColleges} />
      </section>

      {/* Section 4: Research Papers */}
      <section className="mb-16">
        <ResearchPapers />
      </section>

      {/* Section 5: Reviews */}
      <section className="mb-16">
        <StudentReviews reviews={reviews.slice(0, 3)} loading={loading} />
      </section>
    </div>
  );
};

export default Home;