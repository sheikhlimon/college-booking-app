import React from 'react';
import { Link } from 'react-router-dom';
import { Star } from 'lucide-react';
import { type College } from '../services/api';
import Button from './Button';

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
                {college.rating > 0 ? (
                  <span className="inline-flex items-center">
                    {college.rating} <Star className="w-4 h-4 ml-1 text-yellow-500 fill-yellow-500" />
                  </span>
                ) : 'Not Rated'}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Research:</span>
              <span className="font-semibold">{college.researchCount} papers</span>
            </div>
            {college.sports && college.sports.length > 0 && (
              <div className="flex justify-between">
                <span className="text-gray-600">Sports:</span>
                <span className="font-semibold">{college.sports.length} facilities</span>
              </div>
            )}
            {college.events && college.events.length > 0 && (
              <div className="flex justify-between">
                <span className="text-gray-600">Events:</span>
                <span className="font-semibold">{college.events.length} upcoming</span>
              </div>
            )}
          </div>
        )}

        {showActions && (
          <div className="space-y-3">
            <Link to={`/admission?college=${college._id}`} className="block">
              <Button className="w-full justify-center">
                Apply Now
              </Button>
            </Link>
            <Link to={`/colleges/${college._id}`} className="block">
              <Button variant="outline" className="w-full justify-center">
                View Details
              </Button>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default CollegeCard;