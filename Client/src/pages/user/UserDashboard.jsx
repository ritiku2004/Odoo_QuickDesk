import React, { useEffect, useState } from 'react';
import { useAuth } from '../../hooks/useAuth';
import { getTickets } from '../../api/tickets.js';
import TicketCard from '../../components/common/TicketCard';
import { Link } from 'react-router-dom';
import Button from '../../components/ui/Button';
import axios from 'axios';

const UserDashboard = () => {
  const [tickets, setTickets] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [status, setStatus] = useState('');
  const [category, setCategory] = useState('');
  const [categories, setCategories] = useState([]);
  const { token } = useAuth();

  useEffect(() => {
    fetchCategories();
  }, []);

  useEffect(() => {
    fetchTickets();
  }, [token, status, category]);

  const fetchCategories = async () => {
    try {
      const res = await axios.get('/api/categories');
      setCategories(Array.isArray(res.data) ? res.data : []);
    } catch (err) {
      setCategories([]);
    }
  };

  const fetchTickets = async () => {
    setIsLoading(true);
    try {
      const params = {};
      if (status) params.status = status;
      if (category) params.category = category;
      const data = await getTickets(params);
      setTickets(Array.isArray(data) ? data : []);
    } catch (err) {
      setError('Failed to fetch tickets.');
    } finally {
      setIsLoading(false);
    }
  };

return (
  <div className="max-w-6xl mx-auto py-10 px-4">
    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
      <h1 className="text-3xl font-bold text-gray-800">My Tickets</h1>

      <div className="flex flex-wrap items-center gap-3">
        <select
          className="px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none text-sm"
          value={status}
          onChange={e => setStatus(e.target.value)}
        >
          <option value="">All Statuses</option>
          <option value="OPEN">Open</option>
          <option value="IN_PROGRESS">In Progress</option>
          <option value="RESOLVED">Resolved</option>
          <option value="CLOSED">Closed</option>
        </select>

        <select
          className="px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none text-sm"
          value={category}
          onChange={e => setCategory(e.target.value)}
        >
          <option value="">All Categories</option>
          {categories.map(cat => (
            <option key={cat._id} value={cat._id}>{cat.name}</option>
          ))}
        </select>

        <Link to="/user/tickets/new">
          <button className="bg-blue-600 text-white text-sm px-4 py-2 rounded-md hover:bg-blue-700 transition shadow-sm">
            + Create Ticket
          </button>
        </Link>
      </div>
    </div>

    {isLoading ? (
      <div className="text-center text-gray-500 py-20 text-lg">⏳ Loading tickets...</div>
    ) : error ? (
      <div className="text-center text-red-500 py-20 text-lg">{error}</div>
    ) : tickets.length === 0 ? (
      <div className="text-center text-gray-400 py-20 text-lg">No tickets found.</div>
    ) : (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {tickets.map(ticket => (
          <TicketCard key={ticket._id} ticket={ticket} />
        ))}
      </div>
    )}
  </div>
);

};

export default UserDashboard;