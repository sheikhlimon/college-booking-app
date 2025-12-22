import React from 'react';

interface Paper {
  _id: string;
  title: string;
  authors: string[];
  abstract?: string;
  link: string;
  category: string;
  publishDate: string;
  citations?: number;
  collegeId?: {
    _id: string;
    name: string;
  };
}

interface PaperCardProps {
  paper: Paper;
  showCollege?: boolean;
}

const PaperCard: React.FC<PaperCardProps> = ({ paper, showCollege = false }) => {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short'
    });
  };

  return (
    <div className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow duration-300">
      <div className="flex items-start justify-between mb-2">
        <span className="inline-block px-3 py-1 text-xs font-medium text-emerald-800 bg-emerald-100 rounded-full">
          {paper.category}
        </span>
        {paper.citations !== undefined && (
          <span className="text-sm text-gray-500">
            {paper.citations} citations
          </span>
        )}
      </div>

      <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2">
        <a
          href={paper.link}
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-emerald-600 transition-colors"
        >
          {paper.title}
        </a>
      </h3>

      {paper.abstract && (
        <p className="text-sm text-gray-600 mb-3 line-clamp-3">
          {paper.abstract}
        </p>
      )}

      <div className="flex items-center justify-between text-sm text-gray-500">
        <div>
          <span className="font-medium text-gray-700">
            {paper.authors.length > 2
              ? `${paper.authors[0]} et al.`
              : paper.authors.join(', ')}
          </span>
        </div>
        <span>{formatDate(paper.publishDate)}</span>
      </div>

      {showCollege && paper.collegeId && (
        <div className="mt-3 pt-3 border-t border-gray-100">
          <span className="text-xs font-medium text-emerald-700">
            {paper.collegeId.name}
          </span>
        </div>
      )}
    </div>
  );
};

export default PaperCard;
