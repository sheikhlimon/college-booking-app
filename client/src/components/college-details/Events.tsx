import React from 'react';
import { ChevronRight } from 'lucide-react';
import InfoCard from './InfoCard';

interface EventsProps {
  events: string[];
}

const Events: React.FC<EventsProps> = ({ events }) => {
  if (!events || events.length === 0) return null;

  return (
    <InfoCard title="Upcoming Events">
      <div className="space-y-3">
        {events.map((event, index) => (
          <div key={index} className="border-l-4 border-emerald-600 pl-4 py-3 hover:bg-emerald-50 transition-colors rounded-r-lg">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-semibold text-lg text-gray-900">{event}</h3>
                <p className="text-sm text-gray-600">Click for more details</p>
              </div>
              <ChevronRight className="w-5 h-5 text-emerald-600" />
            </div>
          </div>
        ))}
      </div>
    </InfoCard>
  );
};

export default Events;