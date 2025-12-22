import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import ProfileDropdown from './ProfileDropdown';

const Navbar: React.FC = () => {
  const { user } = useAuth();

  return (
    <nav className="bg-blue-600 text-white">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-8">
            <Link to="/" className="text-xl font-bold text-white hover:text-blue-200 transition-colors">
              College Booking
            </Link>

            <div className="flex space-x-6">
              <Link to="/" className="hover:text-blue-200 transition-colors">
                Home
              </Link>
              <Link to="/colleges" className="hover:text-blue-200 transition-colors">
                Colleges
              </Link>
              {user && (
                <Link to="/admission" className="hover:text-blue-200 transition-colors">
                  Admission
                </Link>
              )}
            </div>
          </div>

          <div className="flex items-center">
            <ProfileDropdown />
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;