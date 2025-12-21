import React from 'react';

const Colleges: React.FC = () => {
  const colleges = [
    "Tech Institute",
    "Business School",
    "Arts College",
    "Medical University",
    "Engineering College",
    "Science Academy"
  ];

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold text-gray-900 mb-4 text-center">All Colleges</h1>
      <p className="text-xl text-gray-600 text-center mb-12">
        Find the perfect college for your future
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {colleges.map((name, index) => (
          <div key={index} className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="h-48 bg-gray-200 flex items-center justify-center">
              <span className="text-gray-500">{name}</span>
            </div>

            <div className="p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-3">{name}</h3>

              <div className="space-y-2 mb-6">
                <div className="flex justify-between">
                  <span className="text-gray-600">Admission:</span>
                  <span className="font-semibold">Fall 2024</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Rating:</span>
                  <span className="font-semibold text-blue-600">4.5★</span>
                </div>
              </div>

              <button className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700">
                View Details
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="text-center mt-12">
        <button className="bg-gray-200 text-gray-700 px-8 py-3 rounded-lg hover:bg-gray-300">
          Load More Colleges
        </button>
      </div>
    </div>
  );
};

export default Colleges;