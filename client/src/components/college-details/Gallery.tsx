import React from 'react';

interface GalleryProps {
  images: string[];
  title?: string;
}

const Gallery: React.FC<GalleryProps> = ({ images, title = "Campus Gallery" }) => {
  if (!images || images.length === 0) return null;

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-2xl font-bold text-gray-900 mb-4">{title}</h2>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {images.slice(0, 6).map((image, index) => (
          <div key={index} className="aspect-square bg-gray-200 rounded-lg overflow-hidden">
            {image ? (
              <img
                src={image}
                alt={`Gallery ${index + 1}`}
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-gray-500">
                Image {index + 1}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Gallery;