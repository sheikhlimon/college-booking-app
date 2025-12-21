import React from 'react';

const Home: React.FC = () => {
  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      {/* Hero Section */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Welcome to College Booking
        </h1>
        <p className="text-xl text-gray-600">
          Find and book admissions to your dream colleges
        </p>
      </div>

      {/* Search Section */}
      <div className="mb-12">
        <div className="max-w-2xl mx-auto">
          <input
            type="text"
            placeholder="Search colleges..."
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>

      {/* Featured Colleges */}
      <div className="mb-16">
        <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Featured Colleges</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {['Tech Institute', 'Business School', 'Arts College'].map((name, index) => (
            <div key={index} className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="h-48 bg-gray-200 flex items-center justify-center">
                <span className="text-gray-500">{name}</span>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2">{name}</h3>
                <p className="text-gray-600 mb-4">Admission: Fall 2024</p>
                <button className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700">
                  View Details
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Quick Info */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
        <div className="bg-white rounded-lg shadow-md p-6 text-center">
          <h3 className="text-lg font-semibold mb-2">50+ Colleges</h3>
          <p className="text-gray-600">Wide selection of institutions</p>
        </div>
        <div className="bg-white rounded-lg shadow-md p-6 text-center">
          <h3 className="text-lg font-semibold mb-2">Easy Admission</h3>
          <p className="text-gray-600">Simple application process</p>
        </div>
        <div className="bg-white rounded-lg shadow-md p-6 text-center">
          <h3 className="text-lg font-semibold mb-2">Track Progress</h3>
          <p className="text-gray-600">Monitor your applications</p>
        </div>
      </div>
    </div>
  );
};

export default Home;