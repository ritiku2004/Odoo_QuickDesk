import React, { useEffect, useState, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { getTickets } from '../../api/tickets';
import Pagination from '../../components/common/Pagination'; // Import the new component

const AgentDashboard = () => {
  const [tickets, setTickets] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const { token } = useAuth();

  // State for filters, sorting, and pagination
  const [filters, setFilters] = useState({ status: 'OPEN', sort: 'createdAt_desc' });
  const [pagination, setPagination] = useState({
    currentPage: 1,
    totalPages: 1,
    limit: 10,
  });

  // Memoized function to fetch tickets based on current state
  const fetchTickets = useCallback(async () => {
    setIsLoading(true);
    try {
      const params = {
        ...filters,
        page: pagination.currentPage,
        limit: pagination.limit,
      };
      // Support both array and object response for compatibility
      const data = await getTickets(params, token);
      if (Array.isArray(data)) {
        setTickets(data);
        setPagination(prev => ({ ...prev, totalPages: 1 }));
      } else {
        setTickets(data.tickets || []);
        setPagination(prev => ({ ...prev, totalPages: data.totalPages || 1 }));
      }
    } catch (err) {
      console.error('Failed to fetch tickets', err);
    } finally {
      setIsLoading(false);
    }
  }, [token, filters, pagination.currentPage, pagination.limit]);

  // useEffect to trigger the fetch when the memoized function changes
  useEffect(() => {
    fetchTickets();
  }, [fetchTickets]);

  // Handler for changing filters or sort order
  const handleFilterChange = (e) => {
    setFilters(prev => ({ ...prev, [e.target.name]: e.target.value }));
    // Reset to the first page whenever a filter is changed
    setPagination(prev => ({ ...prev, currentPage: 1 }));
  };

  // Handler for changing the page
  const handlePageChange = (page) => {
    setPagination(prev => ({ ...prev, currentPage: page }));
  };

  const assignTicket = async (ticketId) => {
    try {
      const res = await fetch(`http://localhost:5000/api/tickets/${ticketId}/status`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ status: 'IN_PROGRESS' }),
      });
      if (res.ok) {
        alert('Ticket status updated successfully!');
      } else {
        const errorData = await res.json();
        alert('Failed to update ticket status: ' + (errorData.message || 'Unknown error'));
      }
      fetchTickets();
    } catch (err) {
      alert('Network error: Could not update ticket status.');
    }
  };

 return (
  <div className="p-4 sm:p-6">
    <h1 className="text-3xl font-bold text-gray-800 mb-6">Ticket Queue</h1>

    {/* Filter and Sort Controls */}
    <div className="flex flex-wrap gap-6 mb-6 p-4 bg-white rounded-xl shadow-sm border">
      <div>
        <label htmlFor="status" className="block text-sm font-medium text-gray-700 mb-1">
          Filter by Status
        </label>
        <select
          id="status"
          name="status"
          value={filters.status}
          onChange={handleFilterChange}
          className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        >
          <option value="OPEN">Open</option>
          <option value="IN_PROGRESS">In Progress</option>
          <option value="RESOLVED">Resolved</option>
          <option value="CLOSED">Closed</option>
        </select>
      </div>

      <div>
        <label htmlFor="sort" className="block text-sm font-medium text-gray-700 mb-1">
          Sort By
        </label>
        <select
          id="sort"
          name="sort"
          value={filters.sort}
          onChange={handleFilterChange}
          className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        >
          <option value="createdAt_desc">Newest</option>
          <option value="updatedAt_desc">Recently Updated</option>
        </select>
      </div>
    </div>

    {/* Ticket Table */}
    <div className="bg-white shadow rounded-xl overflow-hidden border">
      {isLoading ? (
        <div className="p-8 text-center text-gray-600">Loading tickets...</div>
      ) : tickets.length === 0 ? (
        <div className="p-8 text-center text-gray-500">No tickets found.</div>
      ) : (
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Subject
              </th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Creator
              </th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Date
              </th>
              <th className="px-6 py-3 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100 bg-white">
            {Array.isArray(tickets) &&
              tickets.map((ticket) => (
                <tr key={ticket._id}>
                  <td className="px-6 py-4 text-sm text-gray-800">
                    {ticket.subject}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-800">
                    {ticket.creator?.name || "N/A"}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-800">
                    {new Date(ticket.createdAt).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 text-sm text-center">
                    <div className="flex justify-center gap-2">
                      <button
                        className="bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded-md text-sm font-medium"
                        onClick={() => assignTicket(ticket._id)}
                      >
                        Assign
                      </button>
                      <Link
                        to={`/agent/tickets/${ticket._id}`}
                        className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded-md text-sm font-medium"
                      >
                        View
                      </Link>
                    </div>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      )}
    </div>

    {/* Pagination Controls */}
    {!isLoading && tickets.length > 0 && (
      <div className="mt-6 flex justify-center">
        <Pagination
          currentPage={pagination.currentPage}
          totalPages={pagination.totalPages}
          onPageChange={handlePageChange}
        />
      </div>
    )}
  </div>
);

}

export default AgentDashboard;