import React from 'react';
import { type College } from '../../services/api';
import CollegeCard from '../CollegeCard';

interface FeaturedCollegesProps {
  colleges: College[];
}

const FeaturedColleges: React.FC<FeaturedCollegesProps> = ({ colleges }) => {
  return (
    <div className="mb-16">
      <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Featured Colleges</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {colleges.map((college) => (
          <CollegeCard
            key={college._id}
            college={college}
            showActions={true}
            showDetails={false}
          />
        ))}
      </div>
    </div>
  );
};

export default FeaturedColleges;