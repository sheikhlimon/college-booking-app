import React from 'react';
import { Link } from 'react-router-dom';

const NotFound: React.FC = () => {
  return (
    <div className="h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center px-4 overflow-hidden">
      <div className="max-w-xl mx-auto text-center">
        {/* 404 Number */}
        <div className="mb-6 relative">
          <h1 className="text-7xl md:text-8xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-teal-700 leading-none">
            404
          </h1>
        </div>

        {/* Error Message */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-3">
            Page Not Found
          </h2>
          <p className="text-gray-600 leading-relaxed">
            The college page you're looking for doesn't exist.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            to="/"
            className="bg-gradient-to-r from-emerald-600 to-teal-700 text-white px-6 py-3 rounded-xl font-medium hover:from-emerald-700 hover:to-teal-800 transition-all duration-200 transform hover:scale-105 shadow-lg"
          >
            Back to Home
          </Link>
          <Link
            to="/colleges"
            className="bg-white text-gray-700 px-6 py-3 rounded-xl font-medium border-2 border-gray-300 hover:border-emerald-600 hover:text-emerald-600 transition-all duration-200 shadow-md"
          >
            Browse Colleges
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NotFound;