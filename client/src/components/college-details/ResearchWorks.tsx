import React, { useState, useEffect } from 'react';
import { BookOpen } from 'lucide-react';
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
          <BookOpen className="w-12 h-12 text-emerald-600" />
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
          icon={<BookOpen className="w-16 h-16 text-gray-300 mx-auto" />}
          title="Unable to Load Papers"
          message={error}
          action={{ label: 'Try Again', onClick: fetchPapers }}
        />
      ) : papers.length === 0 ? (
        <EmptyState
          icon={<BookOpen className="w-16 h-16 text-gray-300 mx-auto" />}
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