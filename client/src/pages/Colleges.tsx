import React from 'react';

// Mock data for 6 colleges
const colleges = [
  {
    id: 1,
    name: "Tech Institute",
    rating: 4.8,
    admissionDate: "2024-09-01",
    researchCount: 42,
    image: "https://via.placeholder.com/300x200/4F46E5/white?text=Tech+Institute"
  },
  {
    id: 2,
    name: "Business School",
    rating: 4.6,
    admissionDate: "2024-08-15",
    researchCount: 28,
    image: "https://via.placeholder.com/300x200/059669/white?text=Business+School"
  },
  {
    id: 3,
    name: "Arts College",
    rating: 4.4,
    admissionDate: "2024-09-10",
    researchCount: 15,
    image: "https://via.placeholder.com/300x200/DC2626/white?text=Arts+College"
  },
  {
    id: 4,
    name: "Medical University",
    rating: 4.9,
    admissionDate: "2024-08-20",
    researchCount: 56,
    image: "https://via.placeholder.com/300x200/7C3AED/white?text=Medical+University"
  },
  {
    id: 5,
    name: "Engineering College",
    rating: 4.5,
    admissionDate: "2024-09-05",
    researchCount: 38,
    image: "https://via.placeholder.com/300x200/0891B2/white?text=Engineering+College"
  },
  {
    id: 6,
    name: "Science Academy",
    rating: 4.7,
    admissionDate: "2024-08-25",
    researchCount: 45,
    image: "https://via.placeholder.com/300x200/059669/white?text=Science+Academy"
  }
];

// Star rating component
const StarRating = ({ rating }: { rating: number }) => {
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 !== 0;

  return (
    <div className="flex items-center">
      {[1, 2, 3, 4, 5].map((star) => (
        <span
          key={star}
          className={`text-lg ${
            star <= fullStars
              ? 'text-yellow-400'
              : star === fullStars + 1 && hasHalfStar
                ? 'text-yellow-400'
                : 'text-gray-300'
          }`}
        >
          {star <= fullStars ? '★' : star === fullStars + 1 && hasHalfStar ? '★' : '☆'}
        </span>
      ))}
      <span className="ml-2 text-gray-600">{rating}</span>
    </div>
  );
};

const Colleges: React.FC = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold text-gray-900 mb-4 text-center">All Colleges</h1>
      <p className="text-xl text-gray-600 text-center mb-12">
        Find the perfect college for your future
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {colleges.map((college) => (
          <div key={college.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
            {/* College Image */}
            <div className="h-56 overflow-hidden">
              <img
                src={college.image}
                alt={college.name}
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
              />
            </div>

            {/* College Info */}
            <div className="p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-3">{college.name}</h3>

              {/* Rating */}
              <div className="mb-4">
                <StarRating rating={college.rating} />
              </div>

              {/* College Details */}
              <div className="space-y-2 mb-6">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Admission Date:</span>
                  <span className="font-semibold text-gray-900">{college.admissionDate}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Research Papers:</span>
                  <span className="font-semibold text-blue-600">{college.researchCount}</span>
                </div>
              </div>

              {/* Action Button */}
              <button className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors font-semibold">
                View Details
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Load More Button */}
      <div className="text-center mt-12">
        <button className="bg-gray-200 text-gray-700 px-8 py-3 rounded-lg hover:bg-gray-300 transition-colors">
          Load More Colleges
        </button>
      </div>
    </div>
  );
};

export default Colleges;