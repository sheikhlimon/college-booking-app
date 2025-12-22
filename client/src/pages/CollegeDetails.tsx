import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getCollegeById, type College } from '../services/api';
import InfoCard from '../components/college-details/InfoCard';
import ImageGallery from '../components/shared/ImageGallery';
import LoadingSpinner from '../components/shared/LoadingSpinner';
import ActionButtons from '../components/college-details/ActionButtons';
import SportsFacilities from '../components/college-details/SportsFacilities';
import ResearchWorks from '../components/college-details/ResearchWorks';
import Events from '../components/college-details/Events';

const CollegeDetails: React.FC = () => {
  const { id } = useParams();
  const [college, setCollege] = useState<College | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!id) return;

    const fetchCollege = async () => {
      try {
        const data = await getCollegeById(id);
        setCollege(data);
      } catch (error) {
        setError('Failed to load college details');
        console.error('Error:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchCollege();
  }, [id]);

  if (loading) {
    return (
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="text-center">
          <LoadingSpinner size="lg" />
          <p className="mt-4 text-gray-600">Loading college details...</p>
        </div>
      </div>
    );
  }

  if (error || !college) {
    return (
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="text-center text-red-600">
          <p>{error || 'College not found'}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-2">{college.name}</h1>
        <p className="text-xl text-gray-600">Rating: {college.rating > 0 ? `${college.rating}★` : 'Not Rated'}</p>
      </div>

      <div className="bg-gray-200 h-64 rounded-lg mb-8 flex items-center justify-center overflow-hidden">
        {college.image ? (
          <img
            src={college.image}
            alt={college.name}
            className="w-full h-full object-cover"
          />
        ) : (
          <span className="text-gray-500 text-lg">Campus Image</span>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          {/* Admission Info */}
          <InfoCard title="Admission Process">
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-emerald-50 rounded-lg">
                <div>
                  <h3 className="font-semibold text-lg text-emerald-800">Next Admission Date</h3>
                  <p className="text-emerald-600">{college.admissionDate}</p>
                </div>
                <svg className="w-8 h-8 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
              <div className="space-y-2">
                <h4 className="font-semibold text-gray-900">Admission Requirements:</h4>
                <ul className="space-y-1 text-gray-700">
                  <li>• High school diploma or equivalent</li>
                  <li>• Minimum GPA of 3.0</li>
                  <li>• Entrance exam scores</li>
                  <li>• Letters of recommendation</li>
                  <li>• Personal statement</li>
                </ul>
              </div>
            </div>
          </InfoCard>

          <Events events={college.events || []} />
          <SportsFacilities sports={college.sports || []} />
          <ResearchWorks collegeId={college._id} researchCount={college.researchCount} />

          {college.gallery && college.gallery.length > 0 && (
            <ImageGallery
              images={college.gallery}
              title="Campus Gallery"
              showCard={true}
              gridCols={{ mobile: 'grid-cols-2', tablet: 'md:grid-cols-3' }}
              aspectRatio="aspect-square"
              showOverlay={false}
              maxImages={6}
            />
          )}
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          <ActionButtons collegeId={college._id} />

          <InfoCard title="Quick Info">
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-600">Research Papers:</span>
                <span className="font-semibold">{college.researchCount}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Sports Facilities:</span>
                <span className="font-semibold">{college.sports?.length || 0}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Upcoming Events:</span>
                <span className="font-semibold">{college.events?.length || 0}</span>
              </div>
            </div>
          </InfoCard>
        </div>
      </div>
    </div>
  );
};

export default CollegeDetails;