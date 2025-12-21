import React, { useState } from 'react';

// Mock data
const featuredColleges = [
  {
    id: 1,
    name: "Tech Institute",
    admissionDate: "2024-09-01",
    events: 15,
    sports: 8,
    research: 42,
    image: "https://via.placeholder.com/300x200/4F46E5/white?text=Tech+Institute"
  },
  {
    id: 2,
    name: "Business School",
    admissionDate: "2024-08-15",
    events: 20,
    sports: 12,
    research: 28,
    image: "https://via.placeholder.com/300x200/059669/white?text=Business+School"
  },
  {
    id: 3,
    name: "Arts College",
    admissionDate: "2024-09-10",
    events: 25,
    sports: 6,
    research: 15,
    image: "https://via.placeholder.com/300x200/DC2626/white?text=Arts+College"
  }
];

const reviews = [
  {
    id: 1,
    collegeName: "Tech Institute",
    rating: 5,
    comment: "Excellent faculty and great campus environment!"
  },
  {
    id: 2,
    collegeName: "Business School",
    rating: 4,
    comment: "Good placement opportunities and industry connections."
  },
  {
    id: 3,
    collegeName: "Arts College",
    rating: 4,
    comment: "Creative atmosphere with excellent art facilities."
  }
];

const researchPapers = [
  "AI Research in Education",
  "Blockchain for Data Security",
  "Sustainable Campus Design"
];

const Home: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredColleges, setFilteredColleges] = useState(featuredColleges);

  // Filter colleges based on search
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const term = e.target.value;
    setSearchTerm(term);

    const filtered = featuredColleges.filter(college =>
      college.name.toLowerCase().includes(term.toLowerCase())
    );
    setFilteredColleges(filtered);
  };

  // Star rating component
  const StarRating = ({ rating }: { rating: number }) => {
    return (
      <div className="flex">
        {[1, 2, 3, 4, 5].map((star) => (
          <span
            key={star}
            className={`text-lg ${star <= rating ? 'text-yellow-400' : 'text-gray-300'}`}
          >
            ★
          </span>
        ))}
      </div>
    );
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Hero Section */}
      <div className="text-center mb-12">
        <h1 className="text-5xl font-bold text-gray-900 mb-4">
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
            placeholder="Search colleges by name..."
            value={searchTerm}
            onChange={handleSearch}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-lg"
          />
        </div>
      </div>

      {/* Featured Colleges Section */}
      <div className="mb-16">
        <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Featured Colleges</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {filteredColleges.map((college) => (
            <div key={college.id} className="bg-white rounded-lg shadow-md overflow-hidden">
              <img
                src={college.image}
                alt={college.name}
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2">{college.name}</h3>
                <p className="text-gray-600 mb-4">Admission: {college.admissionDate}</p>

                <div className="grid grid-cols-3 gap-2 mb-4 text-sm">
                  <div className="text-center">
                    <div className="font-semibold text-blue-600">{college.events}</div>
                    <div className="text-gray-500">Events</div>
                  </div>
                  <div className="text-center">
                    <div className="font-semibold text-green-600">{college.sports}</div>
                    <div className="text-gray-500">Sports</div>
                  </div>
                  <div className="text-center">
                    <div className="font-semibold text-purple-600">{college.research}</div>
                    <div className="text-gray-500">Research</div>
                  </div>
                </div>

                <button className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700">
                  View Details
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Gallery Section */}
      <div className="mb-16">
        <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Campus Gallery</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[1, 2, 3, 4, 5, 6, 7, 8].map((item) => (
            <div key={item} className="aspect-square bg-gray-200 rounded-lg overflow-hidden">
              <img
                src={`https://via.placeholder.com/300x300/E5E7EB/6B7280?text=Graduate+Photo+${item}`}
                alt={`Graduate photo ${item}`}
                className="w-full h-full object-cover hover:scale-105 transition-transform"
              />
            </div>
          ))}
        </div>
      </div>

      {/* Research Papers Section */}
      <div className="mb-16">
        <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Research Papers</h2>
        <div className="max-w-3xl mx-auto">
          <div className="bg-white rounded-lg shadow-md p-6">
            <ul className="space-y-4">
              {researchPapers.map((paper, index) => (
                <li key={index} className="flex items-center justify-between p-3 border rounded hover:bg-gray-50">
                  <span className="text-gray-800">{paper}</span>
                  <a href="#" className="text-blue-600 hover:text-blue-800">View Paper →</a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Reviews Section */}
      <div>
        <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Student Reviews</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {reviews.map((review) => (
            <div key={review.id} className="bg-white rounded-lg shadow-md p-6">
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-semibold text-lg">{review.collegeName}</h3>
                <StarRating rating={review.rating} />
              </div>
              <p className="text-gray-600 italic">"{review.comment}"</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;