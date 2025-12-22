import React from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../Button';

interface ActionButtonsProps {
  collegeId: string;
}

const ActionButtons: React.FC<ActionButtonsProps> = ({ collegeId }) => {
  const navigate = useNavigate();

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <div className="bg-gradient-to-r from-emerald-600 to-teal-700 px-6 py-4">
        <h3 className="font-bold text-lg text-white">Quick Actions</h3>
      </div>
      <div className="p-6">
        <div className="space-y-3">
          <Button
            onClick={() => navigate(`/admission?college=${collegeId}`)}
            className="w-full justify-center"
          >
            Apply for Admission
          </Button>
          <Button variant="outline" className="w-full justify-center">
            Download Brochure
          </Button>
          <Button variant="outline" className="w-full justify-center">
            Schedule Visit
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ActionButtons;