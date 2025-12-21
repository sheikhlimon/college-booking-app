import React from 'react';
import { useParams } from 'react-router-dom';

const CollegeDetails: React.FC = () => {
  const { id } = useParams();

  const college = {
    name: "Tech Institute",
    description: "Excellence in Technology and Innovation",
    admissionProcess: [
      "Submit online application",
      "Pass entrance exam",
      "Attend interview",
      "Submit documents"
    ],
    programs: ["Computer Science", "Engineering", "Data Science"],
    events: ["Tech Summit 2024", "Career Fair", "Science Exhibition"],
    sports: ["Basketball", "Soccer", "Tennis", "Swimming"]
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-2">{college.name}</h1>
        <p className="text-xl text-gray-600">{college.description}</p>
      </div>

      <div className="bg-gray-200 h-64 rounded-lg mb-8 flex items-center justify-center">
        <span className="text-gray-500 text-lg">Campus Image</span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          {/* Admission Process */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Admission Process</h2>
            <div className="space-y-2">
              {college.admissionProcess.map((step, index) => (
                <div key={index} className="flex items-center">
                  <span className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-bold mr-3">
                    {index + 1}
                  </span>
                  <p className="text-gray-700">{step}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Programs */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Programs</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {college.programs.map((program, index) => (
                <div key={index} className="border rounded-lg p-4">
                  <h3 className="font-semibold">{program}</h3>
                  <p className="text-gray-600 text-sm">4-year program</p>
                </div>
              ))}
            </div>
          </div>

          {/* Events */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Upcoming Events</h2>
            <div className="space-y-3">
              {college.events.map((event, index) => (
                <div key={index} className="border-l-4 border-blue-600 pl-4 py-2">
                  <h3 className="font-semibold">{event}</h3>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="font-bold text-lg mb-4">Apply Now</h3>
            <div className="space-y-3">
              <button className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700">
                Apply for Admission
              </button>
              <button className="w-full border border-gray-300 text-gray-700 py-3 rounded-lg hover:bg-gray-50">
                Download Brochure
              </button>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="font-bold text-lg mb-4">Sports</h3>
            <div className="space-y-2">
              {college.sports.map((sport, index) => (
                <div key={index} className="text-gray-700">
                  • {sport}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CollegeDetails;