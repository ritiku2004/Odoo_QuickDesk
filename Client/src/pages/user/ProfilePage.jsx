import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ProfilePage = () => {
  const [profile, setProfile] = useState({ name: '', avatar: '', notificationPrefs: {} });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    setLoading(true);
    try {
      const res = await axios.get('/api/auth/me');
      setProfile(res.data);
    } catch (err) {
      setError('Failed to load profile.');
    } finally {
      setLoading(false);
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      await axios.patch('/api/users/me', profile);
      fetchProfile();
    } catch (err) {
      setError('Failed to update profile.');
    }
  };

  if (loading) return <div className="text-center py-8 text-gray-500">Loading...</div>;
  if (error) return <div className="text-center py-8 text-red-500">{error}</div>;

  return (
  <div className="max-w-2xl mx-auto py-10 px-6 bg-white shadow-lg rounded-lg">
    <h1 className="text-3xl font-bold text-blue-600 mb-8 text-center">Profile & Settings</h1>
    <form onSubmit={handleUpdate} className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
        <input
          type="text"
          className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={profile.name}
          onChange={e => setProfile({ ...profile, name: e.target.value })}
          required
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Avatar URL</label>
        <input
          type="text"
          className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={profile.avatar}
          onChange={e => setProfile({ ...profile, avatar: e.target.value })}
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Notification Preferences (JSON)</label>
        <textarea
          rows="5"
          className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 font-mono text-sm"
          value={JSON.stringify(profile.notificationPrefs)}
          onChange={e => setProfile({ ...profile, notificationPrefs: JSON.parse(e.target.value || '{}') })}
        />
      </div>
      <div className="text-right">
        <button
          type="submit"
          className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-2 rounded-lg shadow-sm transition-all duration-200"
        >
          Update Profile
        </button>
      </div>
    </form>
  </div>
);

};

export default ProfilePage;
