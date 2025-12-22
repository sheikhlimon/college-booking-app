import React from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../Button';

interface ActionButtonsProps {
  collegeId: string;
}

const ActionButtons: React.FC<ActionButtonsProps> = ({ collegeId }) => {
  const navigate = useNavigate();

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h3 className="font-bold text-lg mb-4">Quick Actions</h3>
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
  );
};

export default ActionButtons;