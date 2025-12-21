import React from 'react';
import { useParams } from 'react-router-dom';

// Mock college data (in real app, this would come from API or params)
const collegeData = {
  id: 1,
  name: "Tech Institute",
  images: [
    "https://via.placeholder.com/800x400/4F46E5/white?text=Main+Campus",
    "https://via.placeholder.com/400x300/4F46E5/white?text=Laboratory",
    "https://via.placeholder.com/400x300/4F46E5/white?text=Library",
    "https://via.placeholder.com/400x300/4F46E5/white?text=Sports+Complex"
  ],
  admissionProcess: [
    "Submit online application with transcripts",
    "Pass entrance examination",
    "Attend personal interview",
    "Submit letters of recommendation",
    "Complete medical examination"
  ],
  events: [
    { name: "Tech Summit 2024", date: "March 15-17", type: "Conference" },
    { name: "Career Fair", date: "April 5", type: "Networking" },
    { name: "Science Exhibition", date: "May 10", type: "Academic" },
    { name: "Alumni Meet", date: "June 20", type: "Reunion" }
  ],
  researchWorks: [
    { title: "AI in Healthcare", field: "Artificial Intelligence", year: 2024 },
    { title: "Quantum Computing Applications", field: "Computer Science", year: 2024 },
    { title: "Sustainable Energy Solutions", field: "Environmental Science", year: 2023 },
    { title: "Machine Learning in Education", field: "Data Science", year: 2023 },
    { title: "Blockchain Security", field: "Cybersecurity", year: 2023 }
  ],
  sportsCategories: [
    { name: "Basketball", teams: 3, achievements: "State Champions 2023" },
    { name: "Soccer", teams: 2, achievements: "Regional Finalists 2024" },
    { name: "Cricket", teams: 2, achievements: "Inter-College Winners 2023" },
    { name: "Tennis", teams: 4, achievements: "National Qualifiers 2024" },
    { name: "Athletics", teams: 1, achievements: "12 Medal Winners 2023" },
    { name: "Swimming", teams: 1, achievements: "National Championship 2024" }
  ]
};

const CollegeDetails: React.FC = () => {
  const { id } = useParams();

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-2">{collegeData.name}</h1>
        <p className="text-xl text-gray-600">Excellence in Technology and Innovation</p>
      </div>

      {/* College Images Gallery */}
      <div className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Campus Gallery</h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <div className="col-span-2">
            <img
              src={collegeData.images[0]}
              alt="Main Campus"
              className="w-full h-64 object-cover rounded-lg shadow-lg"
            />
          </div>
          {collegeData.images.slice(1).map((image, index) => (
            <img
              key={index}
              src={image}
              alt={`Campus ${index + 1}`}
              className="w-full h-48 object-cover rounded-lg shadow-lg hover:scale-105 transition-transform cursor-pointer"
            />
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-8">
          {/* Admission Process */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Admission Process</h2>
            <div className="space-y-3">
              {collegeData.admissionProcess.map((step, index) => (
                <div key={index} className="flex items-start">
                  <div className="flex-shrink-0 w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-semibold mr-3">
                    {index + 1}
                  </div>
                  <p className="text-gray-700 pt-1">{step}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Upcoming Events */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Upcoming Events</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {collegeData.events.map((event, index) => (
                <div key={index} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-semibold text-lg">{event.name}</h3>
                    <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded">
                      {event.type}
                    </span>
                  </div>
                  <p className="text-gray-600 flex items-center">
                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    {event.date}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Research Works */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Research Works</h2>
            <div className="space-y-3">
              {collegeData.researchWorks.map((research, index) => (
                <div key={index} className="border-l-4 border-blue-600 pl-4 py-2">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-semibold text-lg">{research.title}</h3>
                      <p className="text-gray-600">{research.field}</p>
                    </div>
                    <span className="bg-gray-100 text-gray-800 text-sm px-2 py-1 rounded">
                      {research.year}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Quick Actions */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="font-bold text-lg mb-4">Quick Actions</h3>
            <div className="space-y-3">
              <button className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 font-semibold">
                Apply for Admission
              </button>
              <button className="w-full border border-blue-600 text-blue-600 py-3 rounded-lg hover:bg-blue-50 font-semibold">
                Download Brochure
              </button>
              <button className="w-full border border-gray-300 text-gray-700 py-3 rounded-lg hover:bg-gray-50">
                Schedule Campus Tour
              </button>
            </div>
          </div>

          {/* Sports Categories */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="font-bold text-lg mb-4">Sports Categories</h3>
            <div className="space-y-3">
              {collegeData.sportsCategories.map((sport, index) => (
                <div key={index} className="border rounded-lg p-3">
                  <div className="flex justify-between items-center mb-1">
                    <h4 className="font-semibold">{sport.name}</h4>
                    <span className="text-sm text-gray-500">{sport.teams} teams</span>
                  </div>
                  <p className="text-sm text-green-600 font-medium">{sport.achievements}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Contact Info */}
          <div className="bg-blue-50 rounded-lg p-6">
            <h3 className="font-bold text-lg mb-4">Need Information?</h3>
            <p className="text-gray-700 mb-4">Get in touch with our admission office</p>
            <div className="space-y-2 text-sm">
              <p className="text-gray-600">📧 admissions@techinstitute.edu</p>
              <p className="text-gray-600">📞 +1 (555) 123-4567</p>
              <p className="text-gray-600">📍 123 Tech Boulevard, Silicon Valley</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CollegeDetails;