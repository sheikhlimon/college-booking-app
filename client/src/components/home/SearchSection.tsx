import React from 'react';

interface SearchSectionProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
}

const SearchSection: React.FC<SearchSectionProps> = ({ searchTerm, onSearchChange }) => {
  return (
    <div className="mb-12">
      <div className="max-w-2xl mx-auto">
        <input
          type="text"
          placeholder="Search colleges..."
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
        />
      </div>
    </div>
  );
};

export default SearchSection;