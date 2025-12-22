import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { updateUser } from '../services/api';
import AlertMessage from '../components/shared/AlertMessage';
import Card from '../components/shared/Card';
import FormField from '../components/shared/FormField';
import Button from '../components/Button';

interface UserData {
  name?: string;
  email?: string;
  university?: string;
  address?: string;
}

const Profile: React.FC = () => {
  const { user } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [userData, setUserData] = useState<UserData>({
    name: user?.displayName || '',
    email: user?.email || '',
    university: '',
    address: ''
  });

  // Simulate fetching user profile data from backend
  useEffect(() => {
    // In a real app, you'd fetch this from your backend
    // For now, using Firebase data plus local state for additional fields
    setUserData({
      name: user?.displayName || '',
      email: user?.email || '',
      university: '',
      address: ''
    });
  }, [user]);

  const handleEditToggle = () => {
    setIsEditing(!isEditing);
    setMessage('');
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setUserData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    try {
      await updateUser(userData.email || '', {
        name: userData.name,
        university: userData.university,
        address: userData.address
      });

      setMessage('Profile updated successfully!');
      setIsEditing(false);
    } catch (error: any) {
      setMessage('Failed to update profile');
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    // Reset to original values
    setUserData({
      name: user?.displayName || '',
      email: user?.email || '',
      university: '',
      address: ''
    });
    setIsEditing(false);
    setMessage('');
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <Card>
        <div className="p-6 border-b">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold">Profile</h1>
            {!isEditing && (
              <Button onClick={handleEditToggle}>
                Edit Profile
              </Button>
            )}
          </div>
        </div>

        {message && (
          <AlertMessage
            type={message.includes('success') ? 'success' : 'error'}
            message={message}
            className="mx-6 mt-6"
          />
        )}

        <div className="p-6">
          {!isEditing ? (
            // View Mode
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                  <p className="text-gray-900">{userData.email || 'Not set'}</p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                  <p className="text-gray-900">{userData.name || 'Not set'}</p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">University</label>
                  <p className="text-gray-900">{userData.university || 'Not set'}</p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Address</label>
                  <p className="text-gray-900">{userData.address || 'Not set'}</p>
                </div>
              </div>

              <div className="pt-6 border-t">
                <p className="text-sm text-gray-600">
                  Member since: {new Date().toLocaleDateString()}
                </p>
              </div>
            </div>
          ) : (
            // Edit Mode
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <FormField
                    label="Email *"
                    name="email"
                    type="email"
                    value={userData.email}
                    onChange={handleInputChange}
                    disabled
                    className="bg-gray-50 text-gray-500"
                  />
                  <p className="text-xs text-gray-500 mt-1">Email cannot be changed</p>
                </div>

                <FormField
                  label="Name"
                  name="name"
                  value={userData.name}
                  onChange={handleInputChange}
                  placeholder="Enter your full name"
                />

                <FormField
                  label="University"
                  name="university"
                  value={userData.university}
                  onChange={handleInputChange}
                  placeholder="Your current university"
                />

                <FormField
                  label="Phone Number"
                  name="phone"
                  type="tel"
                  placeholder="Enter your phone number"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Address
                </label>
                <textarea
                  name="address"
                  rows={3}
                  value={userData.address}
                  onChange={handleInputChange}
                  placeholder="Enter your address"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>

              <div className="flex justify-end space-x-4 pt-6 border-t">
                <Button
                  variant="outline"
                  type="button"
                  onClick={handleCancel}
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  disabled={loading}
                >
                  {loading ? 'Saving...' : 'Save Changes'}
                </Button>
              </div>
            </form>
          )}
        </div>
      </Card>
    </div>
  );
};

export default Profile;