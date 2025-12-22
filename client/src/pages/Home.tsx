import React, { useState, useEffect } from 'react';
import { getAllReviews, getColleges, type Review, type College } from '../services/api';
import CollegeCard from '../components/CollegeCard';
import SearchSection from '../components/home/SearchSection';
import ImageGallery from '../components/shared/ImageGallery';
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
            <CollegeCard
              key={college._id}
              college={college}
              showDetails={true}
              showActions={true}
            />
          ))}
        </div>
      </section>

      {/* Section 3: College Image Gallery */}
      <section className="mb-16">
        <ImageGallery
          colleges={allColleges}
          title="Campus Life Gallery"
          description="Experience the vibrant campus life and diverse community at our partner colleges"
          gridCols={{ mobile: 'grid-cols-2', tablet: 'md:grid-cols-4', desktop: 'lg:grid-cols-6' }}
          imageHeight="h-32"
          showOverlay={true}
          hoverScale="scale-110"
          maxImages={6}
        />
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