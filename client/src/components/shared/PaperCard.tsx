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

  const handleLinkClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    window.open(paper.link, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 flex flex-col h-full">
      {/* Category Badge Bar */}
      <div className="bg-gradient-to-r from-emerald-600 to-teal-700 px-4 py-2">
        <div className="flex items-center justify-between">
          <span className="inline-block px-3 py-1 text-xs font-bold text-white bg-white/20 rounded-full">
            {paper.category}
          </span>
          {paper.citations !== undefined && (
            <span className="text-xs text-emerald-100">
              📚 {paper.citations} citations
            </span>
          )}
        </div>
      </div>

      {/* Content */}
      <div className="p-6 flex-1 flex flex-col">
        <h3 className="text-lg font-bold text-gray-900 mb-3 line-clamp-2 flex-1">
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
          <p className="text-sm text-gray-600 mb-4 line-clamp-3">
            {paper.abstract}
          </p>
        )}

        {/* Authors and Date */}
        <div className="flex items-center justify-between text-sm mb-4">
          <div className="flex-1 mr-2">
            <span className="font-medium text-gray-700">
              {paper.authors.length > 2
                ? `${paper.authors[0]} et al.`
                : paper.authors.join(', ')}
            </span>
          </div>
          <span className="text-gray-500 whitespace-nowrap">{formatDate(paper.publishDate)}</span>
        </div>

        {showCollege && paper.collegeId && (
          <div className="pt-3 border-t border-gray-200">
            <span className="text-xs font-semibold text-emerald-700">
              🎓 {paper.collegeId.name}
            </span>
          </div>
        )}

        {/* Read Link Button */}
        <div className="mt-4 pt-4 border-t border-gray-200">
          <button
            onClick={handleLinkClick}
            className="inline-flex items-center text-sm font-semibold text-emerald-600 hover:text-emerald-800 transition-colors"
          >
            Read Paper
            <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default PaperCard;
