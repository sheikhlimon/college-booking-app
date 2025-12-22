import React, { useState, useRef, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { User, LogOut } from 'lucide-react';
import Button from './Button';

const ProfileDropdown: React.FC = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleLogout = () => {
    logout();
    setIsOpen(false);
  };

  const handleProfile = () => {
    navigate('/profile');
    setIsOpen(false);
  };

  const getInitials = () => {
    if (user?.displayName) {
      return user.displayName.split(' ').map(word => word[0]).join('').toUpperCase().slice(0, 2);
    }
    if (user?.email) {
      return user.email[0].toUpperCase();
    }
    return 'U';
  };

  if (!user) {
    return (
      <Button href="/login" size="sm">
        Login
      </Button>
    );
  }

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-10 h-10 bg-gradient-to-br from-emerald-600 to-teal-700 text-white rounded-full flex items-center justify-center font-semibold hover:from-emerald-700 hover:to-teal-800 transition-all duration-200 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2"
      >
        {getInitials()}
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-3 w-56 bg-white rounded-xl shadow-xl border border-gray-100 z-50 overflow-hidden">
          <div className="bg-gradient-to-r from-emerald-600 to-teal-700 px-4 py-3">
            <p className="text-sm font-semibold text-white truncate">
              {user.displayName || user.email}
            </p>
            <p className="text-xs text-emerald-100 truncate">
              {user.email}
            </p>
          </div>

          <div className="p-1">
            <button
              onClick={handleProfile}
              className="block w-full text-left px-4 py-3 text-sm font-medium text-gray-700 hover:bg-gray-50 rounded-lg transition-colors"
            >
              <div className="flex items-center">
                <User className="w-4 h-4 mr-3 text-gray-400" />
                Profile
              </div>
            </button>

            <button
              onClick={handleLogout}
              className="block w-full text-left px-4 py-3 text-sm font-medium text-red-600 hover:bg-red-50 rounded-lg transition-colors"
            >
              <div className="flex items-center">
                <LogOut className="w-4 h-4 mr-3 text-red-400" />
                Logout
              </div>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfileDropdown;