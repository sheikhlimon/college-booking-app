import React from 'react';
import { type College } from '../../services/api';

interface ImageItem {
  src: string;
  alt?: string;
  overlayText?: string;
}

interface ImageGalleryProps {
  // Image source - either array of strings, array of ImageItem, or colleges array
  images?: string[];
  items?: ImageItem[];
  colleges?: College[];

  // Layout
  gridCols?: {
    mobile?: string;
    tablet?: string;
    desktop?: string;
  };
  imageHeight?: string;
  aspectRatio?: string;

  // Styling
  showCard?: boolean;
  cardClassName?: string;
  containerClassName?: string;
  showCardHeader?: boolean;

  // Overlay
  showOverlay?: boolean;
  overlayOpacity?: string;

  // Header
  title?: string;
  description?: string;
  showTitle?: boolean;
  titleClassName?: string;

  // Behavior
  maxImages?: number;
  hoverScale?: string;
}

const ImageGallery: React.FC<ImageGalleryProps> = ({
  images,
  items,
  colleges,
  gridCols = { mobile: 'grid-cols-2', tablet: 'md:grid-cols-3', desktop: '' },
  imageHeight = 'h-32',
  aspectRatio = 'aspect-square',
  showCard = false,
  cardClassName = 'bg-white rounded-lg shadow-md p-6',
  containerClassName = '',
  showCardHeader = false,
  showOverlay = false,
  overlayOpacity = 'bg-opacity-30',
  title,
  description,
  showTitle = true,
  titleClassName = 'text-3xl font-bold text-gray-900 mb-8 text-center',
  maxImages = 6,
  hoverScale = 'scale-105'
}) => {
  // Build items array from different sources
  let galleryItems: ImageItem[] = [];

  if (colleges) {
    galleryItems = colleges.slice(0, maxImages).map(college => ({
      src: college.gallery?.[0] || college.image,
      alt: `${college.name} campus`,
      overlayText: college.name
    }));
  } else if (items) {
    galleryItems = items.slice(0, maxImages);
  } else if (images) {
    galleryItems = images.slice(0, maxImages).map((src, index) => ({
      src,
      alt: `Gallery ${index + 1}`,
      overlayText: ''
    }));
  }

  if (galleryItems.length === 0) return null;

  const gridClasses = [
    'grid',
    'gap-4',
    gridCols.mobile,
    gridCols.tablet,
    gridCols.desktop
  ].filter(Boolean).join(' ');

  const imageContent = (
    <div className={gridClasses}>
      {galleryItems.map((item, index) => (
        <div
          key={index}
          className={`relative group overflow-hidden rounded-lg ${showOverlay ? '' : aspectRatio}`}
        >
          <img
            src={item.src}
            alt={item.alt || `Gallery ${index + 1}`}
            className={`w-full ${imageHeight} object-cover transition-transform duration-300 group-hover:${hoverScale}`}
          />
          {showOverlay && item.overlayText && (
            <div className={`absolute inset-0 bg-black bg-opacity-0 group-hover:${overlayOpacity} transition-all duration-300 flex items-center justify-center`}>
              <p className="text-white text-sm font-semibold opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-center px-2">
                {item.overlayText}
              </p>
            </div>
          )}
        </div>
      ))}
    </div>
  );

  if (!showTitle && !description && !showCard) {
    return <div className={containerClassName}>{imageContent}</div>;
  }

  return (
    <div className={`${showCard ? cardClassName : ''} ${containerClassName}`}>
      {showCardHeader && title && (
        <div className="bg-gradient-to-r from-emerald-600 to-teal-700 px-6 py-4 -mx-6 -mt-6 mb-6 rounded-t-lg">
          <h2 className="text-2xl font-bold text-white">{title}</h2>
        </div>
      )}
      {showTitle && !showCardHeader && title && (
        <h2 className={titleClassName}>{title}</h2>
      )}
      {imageContent}
      {description && (
        <p className="text-center text-gray-600 mt-6">{description}</p>
      )}
    </div>
  );
};

export default ImageGallery;
