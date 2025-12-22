import React from 'react';
import { Link } from 'react-router-dom';
import { type College } from '../services/api';

interface CollegeCardProps {
  college: College;
  showActions?: boolean;
  showDetails?: boolean;
}

const CollegeCard: React.FC<CollegeCardProps> = ({
  college,
  showActions = true,
  showDetails = true
}) => {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
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

        {showDetails && (
          <div className="space-y-2 mb-6">
            <div className="flex justify-between">
              <span className="text-gray-600">Admission:</span>
              <span className="font-semibold">{college.admissionDate}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Rating:</span>
              <span className="font-semibold text-emerald-600">
                {college.rating > 0 ? `${college.rating}★` : 'Not Rated'}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Research:</span>
              <span className="font-semibold">{college.researchCount} papers</span>
            </div>
          </div>
        )}

        {showActions && (
          <div className="space-y-2">
            <Link
              to={`/admission?college=${college._id}`}
              className="block w-full bg-emerald-600 text-white py-2 rounded-lg hover:bg-emerald-700 text-center font-medium"
            >
              Apply Now
            </Link>
            <Link
              to={`/colleges/${college._id}`}
              className="block w-full bg-slate-700 text-white py-2 rounded-lg hover:bg-slate-800 text-center font-medium"
            >
              View Details
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default CollegeCard;