import React from 'react';
import { Activity } from 'lucide-react';
import InfoCard from './InfoCard';

interface SportsFacilitiesProps {
  sports: string[];
}

const SportsFacilities: React.FC<SportsFacilitiesProps> = ({ sports }) => {
  if (!sports || sports.length === 0) return null;

  return (
    <InfoCard title="Sports Facilities">
      <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
        {sports.map((sport, index) => (
          <div key={index} className="bg-emerald-50 rounded-lg p-3 text-center hover:bg-emerald-100 transition-colors">
            <div className="mb-1 flex justify-center"><Activity className="w-6 h-6 text-emerald-600" /></div>
            <p className="font-medium text-emerald-800">{sport}</p>
          </div>
        ))}
      </div>
    </InfoCard>
  );
};

export default SportsFacilities;