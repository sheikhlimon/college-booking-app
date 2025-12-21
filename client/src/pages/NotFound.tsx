import React from 'react';
import { Link } from 'react-router-dom';

const NotFound: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center px-4">
      <div className="text-center">
        <div className="mb-8">
          <h1 className="text-9xl font-bold text-gray-300">404</h1>
        </div>

        <div className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-2">
            Oops! College Not Found
          </h2>
          <p className="text-gray-600 max-w-md mx-auto">
            The college page you're looking for seems to be on vacation.
            Let's get you back to finding your perfect college!
          </p>
        </div>

        <div className="space-y-4 sm:space-y-0 sm:space-x-4 sm:flex sm:justify-center">
          <Link
            to="/"
            className="block bg-blue-600 text-white px-6 py-3 rounded-md hover:bg-blue-700 transition-colors"
          >
            Go Home
          </Link>
          <Link
            to="/colleges"
            className="block border border-blue-600 text-blue-600 px-6 py-3 rounded-md hover:bg-blue-50 transition-colors"
          >
            Browse Colleges
          </Link>
        </div>

        <div className="mt-12">
          <p className="text-sm text-gray-500">
            "Education is the most powerful weapon which you can use to change the world."
          </p>
          <p className="text-sm text-gray-400 mt-1">- Nelson Mandela</p>
        </div>
      </div>
    </div>
  );
};

export default NotFound;