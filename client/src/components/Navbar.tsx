import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Navbar: React.FC = () => {
  const { user, logout } = useAuth();

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
                <>
                  <Link to="/admission" className="hover:text-blue-200 transition-colors">
                    Admission
                  </Link>
                  <Link to="/profile" className="hover:text-blue-200 transition-colors">
                    Profile
                  </Link>
                </>
              )}
            </div>
          </div>

          <div className="flex items-center space-x-4">
            {user ? (
              <button
                onClick={logout}
                className="bg-white text-blue-600 px-4 py-2 rounded hover:bg-blue-50 transition-colors"
              >
                Logout
              </button>
            ) : (
              <Link to="/login" className="bg-white text-blue-600 px-4 py-2 rounded hover:bg-blue-50 transition-colors">
                Login
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;