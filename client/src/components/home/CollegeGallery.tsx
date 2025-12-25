import React from 'react';
import { type College } from '../../services/api';
import ImageGallery from '../shared/ImageGallery';

interface CollegeGalleryProps {
  colleges: College[];
}

const CollegeGallery: React.FC<CollegeGalleryProps> = ({ colleges }) => {
  if (colleges.length === 0) {
    return null;
  }

  return (
    <section className="mb-16">
      <ImageGallery
        colleges={colleges}
        title="Campus Life Gallery"
        description="Experience the vibrant campus life and diverse community at our partner colleges"
        gridCols={{ mobile: 'grid-cols-2', tablet: 'md:grid-cols-4', desktop: 'lg:grid-cols-6' }}
        imageHeight="h-32"
        showOverlay={true}
        hoverScale="scale-110"
        maxImages={6}
      />
    </section>
  );
};

export default CollegeGallery;
