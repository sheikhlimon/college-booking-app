import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { submitAdmission } from '../services/api';

const Admission: React.FC = () => {
  const [searchParams] = useSearchParams();
  const { user } = useAuth();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    const formData = new FormData(e.target as HTMLFormElement);

    try {
      await submitAdmission({
        candidateName: formData.get('candidateName') as string,
        subject: formData.get('subject') as string,
        email: user?.email || formData.get('email') as string,
        phone: formData.get('phone') as string,
        address: formData.get('address') as string,
        dob: formData.get('dob') as string,
        image: formData.get('image') as string || 'default-image.jpg',
        collegeId: searchParams.get('college') || formData.get('collegeId') as string
      });

      // Redirect to My College
      navigate('/my-college');
    } catch (error: any) {
      setError(error.message || 'Failed to submit application');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">College Admission</h1>

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6">
          {error}
        </div>
      )}

      <div className="bg-white rounded-lg shadow-md p-6">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input name="candidateName" placeholder="Candidate Name" required className="w-full p-2 border rounded" />
            <input name="subject" placeholder="Subject" required className="w-full p-2 border rounded" />
            <input name="email" type="email" value={user?.email || ''} disabled className="w-full p-2 border rounded bg-gray-50" />
            <input name="phone" placeholder="Phone" required className="w-full p-2 border rounded" />
            <input name="dob" type="date" required className="w-full p-2 border rounded" />
            <input name="image" placeholder="Image URL (optional)" className="w-full p-2 border rounded" />
          </div>

          <textarea name="address" placeholder="Address" required rows={3} className="w-full p-2 border rounded" />

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 disabled:opacity-50"
          >
            {loading ? 'Submitting...' : 'Submit Application'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Admission;