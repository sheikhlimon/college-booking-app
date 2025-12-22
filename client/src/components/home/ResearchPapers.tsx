import React, { useState, useEffect } from 'react';
import SectionTitle from '../shared/SectionTitle';
import PaperCard from '../shared/PaperCard';
import EmptyState from '../shared/EmptyState';
import LoadingSpinner from '../shared/LoadingSpinner';
import { getAllPapers, ResearchPaper } from '../../services/api';

const ResearchPapers: React.FC = () => {
  const [papers, setPapers] = useState<ResearchPaper[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  const categories = ['All', 'Artificial Intelligence', 'Quantum Computing', 'Business Strategy',
    'Biotechnology', 'Energy Storage', 'Robotics', 'Climate Science'];

  useEffect(() => {
    fetchPapers();
  }, [selectedCategory]);

  const fetchPapers = async () => {
    try {
      setLoading(true);
      setError(null);
      const filters = selectedCategory !== 'All' ? { category: selectedCategory } : undefined;
      const data = await getAllPapers(filters);
      setPapers(data);
    } catch (err) {
      setError('Failed to load research papers');
      console.error('Error fetching papers:', err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="mb-16">
        <SectionTitle>Research Highlights</SectionTitle>
        <div className="text-center py-12">
          <LoadingSpinner />
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="mb-16">
        <SectionTitle>Research Highlights</SectionTitle>
        <EmptyState
          icon="📚"
          title="Unable to Load Papers"
          message={error}
          action={{ label: 'Try Again', onClick: fetchPapers }}
        />
      </div>
    );
  }

  if (papers.length === 0) {
    return (
      <div className="mb-16">
        <SectionTitle>Research Highlights</SectionTitle>
        <EmptyState
          icon="📚"
          title="No Research Papers Found"
          message="Check back later for new publications from our partner institutions."
        />
      </div>
    );
  }

  return (
    <div className="mb-16">
      <SectionTitle>Research Highlights</SectionTitle>

      <div className="max-w-6xl mx-auto">
        <p className="text-gray-600 mb-6 text-center">
          Discover groundbreaking research from our partner institutions
        </p>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-2 mb-8">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                selectedCategory === category
                  ? 'bg-emerald-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Papers Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {papers.map((paper) => (
            <PaperCard key={paper._id} paper={paper} showCollege={true} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ResearchPapers;