import React, { useEffect, useState } from 'react';
import api from '../../api/api';

const TicketTable = () => {
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTickets = async () => {
      try {
        const res = await api.get('/tickets');
        setTickets(Array.isArray(res.data) ? res.data : []);
      } catch (err) {
        setError('Failed to fetch tickets');
      } finally {
        setLoading(false);
      }
    };
    fetchTickets();
  }, []);

  if (loading) return <div>Loading tickets...</div>;
  if (error) return <div className="text-red-500">{error}</div>;

return (
  <div className="overflow-x-auto">
    <h2 className="text-2xl font-semibold text-gray-800 mb-6">Ticket Overview</h2>
    <div className="shadow-xl rounded-lg border border-gray-200 overflow-hidden">
      <table className="min-w-full bg-white text-sm text-left text-gray-700">
        <thead className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white text-sm uppercase">
          <tr>
            <th className="px-6 py-4">Subject</th>
            <th className="px-6 py-4">Status</th>
            <th className="px-6 py-4">Category</th>
            <th className="px-6 py-4">Created By</th>
            <th className="px-6 py-4">Created At</th>
            <th className="px-6 py-4">Closed By</th>
            <th className="px-6 py-4">Closed At</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100">
          {tickets.map(ticket => (
            <tr key={ticket._id} className="hover:bg-gray-50 transition">
              <td className="px-6 py-4 font-medium">{ticket.subject}</td>
              <td className="px-6 py-4">
                <span
                  className={`px-3 py-1 text-xs font-semibold rounded-full ${
                    ticket.status === 'OPEN'
                      ? 'bg-blue-100 text-blue-700'
                      : ticket.status === 'IN_PROGRESS'
                      ? 'bg-yellow-100 text-yellow-800'
                      : 'bg-green-100 text-green-800'
                  }`}
                >
                  {ticket.status}
                </span>
              </td>
              <td className="px-6 py-4">{ticket.category?.name || '-'}</td>
              <td className="px-6 py-4">{ticket.creator?.name || '-'}</td>
              <td className="px-6 py-4">{new Date(ticket.createdAt).toLocaleString()}</td>
              <td className="px-6 py-4">
                {ticket.status === 'CLOSED' ? ticket.closedBy?.name || '-' : '-'}
              </td>
              <td className="px-6 py-4">
                {ticket.status === 'CLOSED' && ticket.closedAt
                  ? new Date(ticket.closedAt).toLocaleString()
                  : '-'}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
);

};

export default TicketTable;
