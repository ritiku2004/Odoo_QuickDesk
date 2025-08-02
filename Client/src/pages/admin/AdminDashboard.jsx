import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { getTicketStats } from '../../api/tickets';
import TicketTable from './TicketTable';

// A simple component for displaying a stat card
const StatCard = ({ title, value, color }) => (
  <div className={`p-6 rounded-lg shadow-md ${color}`}>
    <h3 className="text-lg font-semibold text-white">{title}</h3>
    <p className="text-4xl font-bold text-white mt-2">{value}</p>
  </div>
);

const AdminDashboard = () => {
  const [stats, setStats] = useState(null);
  // const [isLoading, setIsLoading] = useState(true);
  const { token } = useAuth();

  // useEffect(() => {
  //   const fetchStats = async () => {
  //     try {
  //       // const data = await getTicketStats(token);
  //       setStats(data);
  //     } catch (err) {
  //       console.error("Failed to fetch stats", err);
  //     } finally {
  //       setIsLoading(false);
  //     }
  //   };
  //   fetchStats();
  // }, [token]);

  // if (isLoading) {
  //   return <div className="p-8 text-center">Loading dashboard stats...</div>;
  // }

return (
  <div className="p-6 bg-gradient-to-br from-white to-blue-50 min-h-screen">
    <h1 className="text-4xl font-bold text-gray-900 mb-10 tracking-tight">
      Admin Dashboard
    </h1>


    {/* Management Buttons */}
    <div className="flex flex-wrap gap-4 mb-12">
      <Link
        to="/admin/users"
        className="inline-flex items-center gap-2 px-5 py-3 bg-blue-600 text-white text-sm font-medium rounded-xl shadow hover:bg-blue-700 transition-all duration-200"
      >
        User Management
      </Link>
      <Link
        to="/admin/categories"
        className="inline-flex items-center gap-2 px-5 py-3 bg-green-600 text-white text-sm font-medium rounded-xl shadow hover:bg-green-700 transition-all duration-200"
      >
        Category Management
      </Link>
    </div>

    {/* Tickets Table */}
    <div className="bg-white rounded-2xl shadow-xl border border-gray-200 p-6">
      <TicketTable />
    </div>
  </div>
);


};

export default AdminDashboard;