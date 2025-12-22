import React from 'react';
import InfoCard from './InfoCard';

interface ResearchWorksProps {
  researchCount: number;
}

const ResearchWorks: React.FC<ResearchWorksProps> = ({ researchCount }) => {
  return (
    <InfoCard title="Research Works">
      <div className="bg-emerald-50 rounded-lg p-4 mb-4">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-3xl font-bold text-emerald-800">{researchCount}</p>
            <p className="text-emerald-600">Published Research Papers</p>
          </div>
          <svg className="w-12 h-12 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
          </svg>
        </div>
      </div>
      <div className="space-y-3">
        <h3 className="font-semibold text-lg">Research Areas</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <div className="border rounded-lg p-3 hover:shadow-md transition-shadow">
            <h4 className="font-medium text-gray-900">Computer Science</h4>
            <p className="text-sm text-gray-600">AI, Machine Learning, Data Science</p>
          </div>
          <div className="border rounded-lg p-3 hover:shadow-md transition-shadow">
            <h4 className="font-medium text-gray-900">Engineering</h4>
            <p className="text-sm text-gray-600">Robotics, IoT, Renewable Energy</p>
          </div>
          <div className="border rounded-lg p-3 hover:shadow-md transition-shadow">
            <h4 className="font-medium text-gray-900">Business Studies</h4>
            <p className="text-sm text-gray-600">Finance, Marketing, Entrepreneurship</p>
          </div>
          <div className="border rounded-lg p-3 hover:shadow-md transition-shadow">
            <h4 className="font-medium text-gray-900">Natural Sciences</h4>
            <p className="text-sm text-gray-600">Physics, Chemistry, Biology</p>
          </div>
        </div>
      </div>
    </InfoCard>
  );
};

export default ResearchWorks;