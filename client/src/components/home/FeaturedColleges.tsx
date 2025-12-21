import React from 'react';
import { Link } from 'react-router-dom';
import { type College } from '../../services/api';

interface FeaturedCollegesProps {
  colleges: College[];
}

const FeaturedColleges: React.FC<FeaturedCollegesProps> = ({ colleges }) => {
  return (
    <div className="mb-16">
      <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Featured Colleges</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {colleges.map((college) => (
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
              <h3 className="text-xl font-semibold mb-2">{college.name}</h3>
              <p className="text-gray-600 mb-4">Admission: {college.admissionDate}</p>
              <div className="space-y-2">
                <Link
                  to={`/admission?college=${college._id}`}
                  className="block w-full bg-green-600 text-white py-2 rounded hover:bg-green-700 text-center"
                >
                  Apply Now
                </Link>
                <Link
                  to={`/colleges/${college._id}`}
                  className="block w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 text-center"
                >
                  View Details
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FeaturedColleges;