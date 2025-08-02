import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { getTicketById, updateTicketStatus } from '../../api/tickets';
import Button from '../../components/ui/Button';

const AgentTicketView = () => {
  const { id } = useParams();
  const { token } = useAuth();
  const [ticket, setTicket] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchTicket = async () => {
      try {
        const data = await getTicketById(id, token);
        setTicket(data);
      } finally {
        setIsLoading(false);
      }
    };
    fetchTicket();
  }, [id, token]);

  const handleStatusChange = async (newStatus) => {
    try {
      const updatedTicket = await updateTicketStatus(id, newStatus, token);
      setTicket(updatedTicket);
    } catch (err) {
      console.error("Failed to update status", err);
    }
  };

  if (isLoading) return <div className="text-center text-sm text-gray-500 mt-10">Loading ticket...</div>;
  if (!ticket) return <div className="text-center text-sm text-red-500 mt-10">Ticket not found.</div>;

  return (
    <div className="p-6 max-w-5xl mx-auto space-y-6">
      {/* Agent Controls */}
      <div className="bg-gradient-to-r from-yellow-50 to-yellow-100 border border-yellow-200 rounded-xl p-5 shadow-sm">
        <h2 className="text-xl font-semibold text-yellow-800 mb-3">Agent Controls</h2>
        <div className="flex flex-wrap gap-2 items-center">
          <span className="text-sm text-gray-700">Change Status:</span>
          <button
            onClick={() => handleStatusChange('IN_PROGRESS')}
            className="text-xs px-3 py-1.5 rounded-full bg-blue-100 text-blue-700 hover:bg-blue-200 transition font-medium"
          >
            In Progress
          </button>
          <button
            onClick={() => handleStatusChange('RESOLVED')}
            className="text-xs px-3 py-1.5 rounded-full bg-green-100 text-green-700 hover:bg-green-200 transition font-medium"
          >
            Resolved
          </button>
          <button
            onClick={() => handleStatusChange('CLOSED')}
            className="text-xs px-3 py-1.5 rounded-full bg-gray-200 text-gray-700 hover:bg-gray-300 transition font-medium"
          >
            Closed
          </button>
        </div>
      </div>

      {/* Ticket Details */}
      <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-md">
        <h1 className="text-2xl font-bold text-gray-800">{ticket.subject}</h1>
        <p className="text-sm text-gray-600 mt-3 leading-relaxed">{ticket.description}</p>

        {/* Comments Section */}
        <div className="mt-6">
          <h2 className="text-lg font-semibold text-gray-800 mb-2">Comments</h2>
          <div className="space-y-4">
            {Array.isArray(ticket.comments) && ticket.comments.length > 0 ? (
              ticket.comments.map((comment) => (
                <div
                  key={comment._id}
                  className="bg-gray-50 border border-gray-200 rounded-md p-3"
                >
                  <p className="text-sm text-gray-700">{comment.body}</p>
                  <p className="text-xs text-gray-500 mt-1">
                    By <span className="font-medium">{comment.author.name}</span> on{' '}
                    {new Date(comment.createdAt).toLocaleString()}
                  </p>
                </div>
              ))
            ) : (
              <p className="text-sm text-gray-500">No comments yet.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AgentTicketView;
