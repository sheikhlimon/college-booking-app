import React from 'react';

const ResearchPapers: React.FC = () => {
  const papers = [
    {
      title: "AI in Healthcare: Revolutionizing Patient Care",
      college: "Tech Institute",
      link: "#",
      category: "Artificial Intelligence"
    },
    {
      title: "Sustainable Business Models for the Future",
      college: "Business School",
      link: "#",
      category: "Business Studies"
    },
    {
      title: "CRISPR Gene Editing: Medical Breakthroughs",
      college: "Medical University",
      link: "#",
      category: "Biotechnology"
    }
  ];

  return (
    <div className="mb-16">
      <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Research Highlights</h2>
      <div className="max-w-4xl mx-auto">
        <p className="text-gray-600 mb-6 text-center">
          Discover groundbreaking research from our partner institutions
        </p>
        <div className="space-y-4">
          {papers.map((paper, index) => (
            <div key={index} className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow duration-300">
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <span className="inline-block px-2 py-1 bg-blue-100 text-blue-800 text-xs font-semibold rounded-full mb-2">
                    {paper.category}
                  </span>
                  <h3 className="font-semibold text-gray-900 mb-1">{paper.title}</h3>
                  <p className="text-sm text-gray-600">by {paper.college}</p>
                </div>
                <a
                  href={paper.link}
                  className="text-blue-600 hover:text-blue-800 text-sm font-medium flex items-center ml-4"
                >
                  Read
                  <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ResearchPapers;