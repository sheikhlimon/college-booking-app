import React from 'react';
import { type College } from '../../services/api';
import CollegeCard from '../CollegeCard';
import LoadingSpinner from '../shared/LoadingSpinner';

interface FeaturedCollegesProps {
  colleges: College[];
  loading: boolean;
}

const FeaturedColleges: React.FC<FeaturedCollegesProps> = ({ colleges, loading }) => {
  if (loading) {
    return (
      <section className="mb-16">
        <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">Featured Colleges</h2>
        <div className="text-center py-12">
          <LoadingSpinner size="lg" />
          <p className="mt-4 text-gray-600">Loading colleges...</p>
        </div>
      </section>
    );
  }

  if (colleges.length === 0) {
    return null;
  }

  return (
    <section className="mb-16">
      <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">Featured Colleges</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {colleges.map((college) => (
          <CollegeCard
            key={college._id}
            college={college}
            showDetails={true}
            showActions={true}
          />
        ))}
      </div>
    </section>
  );
};

export default FeaturedColleges;
