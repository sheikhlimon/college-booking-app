import React, { useState, useEffect } from 'react';
import InfoCard from './InfoCard';
import PaperCard from '../shared/PaperCard';
import EmptyState from '../shared/EmptyState';
import LoadingSpinner from '../shared/LoadingSpinner';
import { getPapersByCollege, type ResearchPaper } from '../../services/api';

interface ResearchWorksProps {
  collegeId: string;
  researchCount: number;
}

const ResearchWorks: React.FC<ResearchWorksProps> = ({ collegeId, researchCount }) => {
  const [papers, setPapers] = useState<ResearchPaper[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchPapers();
  }, [collegeId]);

  const fetchPapers = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await getPapersByCollege(collegeId);
      setPapers(data);
    } catch (err) {
      setError('Failed to load research papers');
      console.error('Error fetching papers:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <InfoCard title="Research Works">
      {/* Research Count */}
      <div className="bg-emerald-50 rounded-lg p-4 mb-4">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-3xl font-bold text-emerald-800">{researchCount}</p>
            <p className="text-emerald-600">Published Research Papers</p>
          </div>
          <svg className="w-12 h-12 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
          </svg>
        </div>
      </div>

      {/* Papers List */}
      {loading ? (
        <div className="text-center py-8">
          <LoadingSpinner />
          <p className="mt-2 text-gray-600">Loading research papers...</p>
        </div>
      ) : error ? (
        <EmptyState
          icon="📚"
          title="Unable to Load Papers"
          message={error}
          action={{ label: 'Try Again', onClick: fetchPapers }}
        />
      ) : papers.length === 0 ? (
        <EmptyState
          icon="📚"
          title="No Research Papers Yet"
          message="This college hasn't published any research papers yet."
        />
      ) : (
        <div className="space-y-4">
          <h3 className="font-semibold text-lg text-gray-900 mb-3">Recent Publications</h3>
          <div className="space-y-4">
            {papers.map((paper) => (
              <PaperCard key={paper._id} paper={paper} showCollege={false} />
            ))}
          </div>
        </div>
      )}
    </InfoCard>
  );
};

export default ResearchWorks;