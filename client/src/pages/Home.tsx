import React, { useState, useEffect } from 'react';
import { getAllReviews, getColleges, type Review, type College } from '../services/api';
import SearchSection from '../components/home/SearchSection';
import FeaturedColleges from '../components/home/FeaturedColleges';
import CollegeGallery from '../components/home/CollegeGallery';
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
      <FeaturedColleges colleges={filteredColleges} loading={loading} />

      {/* Section 3: College Image Gallery */}
      <CollegeGallery colleges={allColleges} />

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