import React from 'react';
import { type College } from '../../services/api';

interface CampusGalleryProps {
  colleges: College[];
}

const CampusGallery: React.FC<CampusGalleryProps> = ({ colleges }) => {
  return (
    <div className="mb-16">
      <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Campus Life Gallery</h2>
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
        {colleges.slice(0, 6).map((college, index) => (
          <div key={index} className="relative group overflow-hidden rounded-lg">
            <img
              src={college.gallery?.[0] || college.image}
              alt={`${college.name} campus`}
              className="w-full h-32 object-cover transition-transform duration-300 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-all duration-300 flex items-center justify-center">
              <p className="text-white text-sm font-semibold opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-center px-2">
                {college.name}
              </p>
            </div>
          </div>
        ))}
      </div>
      <p className="text-center text-gray-600 mt-6">
        Experience the vibrant campus life and diverse community at our partner colleges
      </p>
    </div>
  );
};

export default CampusGallery;