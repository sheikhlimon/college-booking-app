import React from 'react';
import { useAuth } from '../context/AuthContext';

const Profile: React.FC = () => {
  const { user } = useAuth();

  return (
    <div className="max-w-2xl mx-auto p-6">
      <div className="bg-white rounded-lg shadow-md p-6">
        <h1 className="text-2xl font-bold mb-6">Profile</h1>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
            <p className="text-gray-900">{user?.email}</p>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
            <p className="text-gray-900">{user?.displayName || 'Not set'}</p>
          </div>

          <div className="pt-4 border-t">
            <p className="text-sm text-gray-600">
              Member since: {new Date().toLocaleDateString()}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;