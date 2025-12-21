import React, { useState, useEffect } from 'react';
import { getAllReviews, getColleges, type Review, type College } from '../services/api';
import HeroSection from '../components/home/HeroSection';
import SearchSection from '../components/home/SearchSection';
import FeaturedColleges from '../components/home/FeaturedColleges';
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
        setReviews(reviewsData.slice(0, 6));
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
    <div className="max-w-6xl mx-auto px-4 py-8">
      <HeroSection />
      <SearchSection searchTerm={searchTerm} onSearchChange={setSearchTerm} />
      <FeaturedColleges colleges={filteredColleges} />
      <CampusGallery colleges={allColleges} />
      <ResearchPapers />
      <StudentReviews reviews={reviews} loading={loading} />

      {/* Quick Info */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
        <div className="bg-white rounded-lg shadow-md p-6 text-center">
          <h3 className="text-lg font-semibold mb-2">50+ Colleges</h3>
          <p className="text-gray-600">Wide selection of institutions</p>
        </div>
        <div className="bg-white rounded-lg shadow-md p-6 text-center">
          <h3 className="text-lg font-semibold mb-2">Easy Admission</h3>
          <p className="text-gray-600">Simple application process</p>
        </div>
        <div className="bg-white rounded-lg shadow-md p-6 text-center">
          <h3 className="text-lg font-semibold mb-2">Track Progress</h3>
          <p className="text-gray-600">Monitor your applications</p>
        </div>
      </div>
    </div>
  );
};

export default Home;