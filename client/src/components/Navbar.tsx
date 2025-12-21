import React from 'react';
import { useAuth } from '../context/AuthContext';

const Navbar: React.FC = () => {
  const { user, logout } = useAuth();

  return (
    <nav className="bg-blue-600 text-white">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-8">
            <h1 className="text-xl font-bold">College Booking</h1>

            {user && (
              <div className="flex space-x-6">
                <a href="/" className="hover:text-blue-200 transition-colors">
                  Home
                </a>
                <a href="/colleges" className="hover:text-blue-200 transition-colors">
                  Colleges
                </a>
                <a href="/admission" className="hover:text-blue-200 transition-colors">
                  Admission
                </a>
                <a href="/my-college" className="hover:text-blue-200 transition-colors">
                  My College
                </a>
                <a href="/profile" className="hover:text-blue-200 transition-colors">
                  Profile
                </a>
              </div>
            )}
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
              <a href="/login" className="bg-white text-blue-600 px-4 py-2 rounded hover:bg-blue-50 transition-colors">
                Login
              </a>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;