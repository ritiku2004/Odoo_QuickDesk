import React from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

// A simple Header component for demonstration
const Header = () => {
  const { logout, user, loading } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

return (
  <header className="bg-white border-b border-gray-200 shadow-sm">
    <nav className="container mx-auto px-6 py-3 flex justify-between items-center">
      <span className="text-lg sm:text-xl font-semibold text-blue-700 tracking-wide">
        SupportSystem
      </span>

      <div className="flex items-center gap-4 text-sm text-gray-700">
        <span>
          {loading ? 'Loading...' : `Welcome, ${user?.name || 'User'}!`}
        </span>
        <button
          onClick={handleLogout}
          className="px-4 py-1.5 bg-red-500 text-white font-medium rounded-md hover:bg-red-600 transition-all duration-200 shadow-sm"
        >
          Logout
        </button>
      </div>
    </nav>
  </header>
);
};


const AppLayout = () => {
  const { loading, user } = useAuth();
  if (loading) {
    return <div className="p-8 text-center">Loading...</div>;
  }
return (
  <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-100 text-gray-800 text-sm">
    {/* Sticky top header */}
    <Header />

    {/* Navigation bar */}
    <nav className="sticky top-0 z-10 bg-white border-b border-gray-200 shadow-sm">
      <div className="container mx-auto px-6 py-4 flex flex-wrap items-center justify-between">
        <h1 className="text-base sm:text-lg font-semibold tracking-wide text-blue-800">
          <span className="capitalize">{user?.role?.toLowerCase()}</span>
        </h1>

        <div className="flex gap-2 sm:gap-3 font-medium">
          {user?.role === 'ADMIN' && (
            <a
              href="/admin"
              className="px-4 py-1.5 rounded-md bg-blue-600 text-white hover:bg-blue-700 transition-all duration-200 shadow-sm"
            >
              Admin Dashboard
            </a>
          )}
          {user?.role === 'AGENT' && (
            <a
              href="/agent/dashboard"
              className="px-4 py-1.5 rounded-md bg-green-600 text-white hover:bg-green-700 transition-all duration-200 shadow-sm"
            >
              Agent Dashboard
            </a>
          )}
          {(user?.role === 'USER' || user?.role === 'END_USER') && (
            <a
              href="/user/dashboard"
              className="px-4 py-1.5 rounded-md bg-gray-600 text-white hover:bg-gray-700 transition-all duration-200 shadow-sm"
            >
              User Dashboard
            </a>
          )}
        </div>
      </div>
    </nav>

    {/* Main content area */}
    <main className="container mx-auto px-6 py-10">
      <div className="bg-white border border-gray-200 shadow-md rounded-xl p-6 sm:p-8">
        <Outlet />
      </div>
    </main>
  </div>
);





};

export default AppLayout;