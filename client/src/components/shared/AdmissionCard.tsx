import React from 'react';

interface Admission {
  _id: string;
  collegeId: string | { _id: string; name: string; image: string };
  subject: string;
  email: string;
  createdAt: string;
}

interface AdmissionCardProps {
  admission: Admission;
}

const AdmissionCard: React.FC<AdmissionCardProps> = ({ admission }) => {
  const college = typeof admission.collegeId === 'object' ? admission.collegeId : null;

  return (
    <div className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow bg-gradient-to-br from-white to-gray-50">
      <div className="flex justify-between items-start mb-3">
        <div className="flex-1">
          <h3 className="font-bold text-lg text-gray-900">
            {college?.name || 'College'}
          </h3>
          <p className="text-gray-600 mt-1">Program: {admission.subject}</p>
        </div>
        <span className="px-3 py-1 text-sm font-semibold rounded-full bg-yellow-100 text-yellow-800 ml-3">
          Under Review
        </span>
      </div>
      <div className="grid grid-cols-2 gap-4 text-sm mt-3 pt-3 border-t border-gray-200">
        <div>
          <span className="text-gray-500 block">Applied</span>
          <p className="font-medium text-gray-900">{new Date(admission.createdAt).toLocaleDateString()}</p>
        </div>
        <div>
          <span className="text-gray-500 block">Email</span>
          <p className="font-medium text-gray-900 text-sm">{admission.email}</p>
        </div>
      </div>
    </div>
  );
};

export default AdmissionCard;
