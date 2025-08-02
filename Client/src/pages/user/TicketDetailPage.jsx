import React, { useEffect, useState } from 'react';
import api from '../../api/api';
import { useParams } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { getTicketById } from '../../api/tickets';
import { addComment } from '../../api/tickets'; // Import the new function
import Button from '../../components/ui/Button';

// ...existing code...

const TicketDetailPage = () => {
    const { id } = useParams(); // Gets ticket 'id' from the URL
    const { token } = useAuth();

    const [ticket, setTicket] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [comment, setComment] = useState('');
    const [isSubmittingComment, setIsSubmittingComment] = useState(false);

    const handleComment = async (e) => {
        e.preventDefault();
        if (!comment.trim()) return;

        setIsSubmittingComment(true);
        try {
            await api.post(`/tickets/${id}/comments`, { body: comment });
            setComment('');
            await fetchTicket(); // Refresh ticket details to show new comment
        } catch (err) {
            console.error("Failed to post comment", err);
        } finally {
            setIsSubmittingComment(false);
        }
    };
    const handleStatusChange = async (newStatus) => {
        try {
            await api.patch(`/tickets/${id}/status`, { status: newStatus });
            await fetchTicket();
        } catch (err) {
            console.error("Failed to update status", err);
        }
    };

    const handleVote = async (voteType) => {
        try {
            await api.post(`/tickets/${id}/vote`, { type: voteType });
            // Update the local state with the new vote counts from the server
            fetchTicket();
        } catch (err) {
            console.error("Failed to cast vote", err);
        }
    };

    const fetchTicket = async () => {
        try {
            const data = await getTicketById(id, token);
            setTicket(data);
        } catch (err) {
            setError('Failed to fetch ticket details.');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchTicket();
    }, [id, token]);

    if (loading) return <div className="text-center py-8 text-gray-500">Loading...</div>;
    if (error) return <div className="text-red-500">{error}</div>;
    if (!ticket) return <div>Ticket not found.</div>;


    // ...existing code...

  return (
  <div className="p-6 max-w-5xl mx-auto">
    {/* Ticket Details Section */}
    <div className="bg-white rounded-xl shadow-md p-6 mb-8">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-3xl font-semibold text-gray-800">{ticket.subject}</h1>
        <span className={`px-3 py-1 text-sm font-medium rounded-full 
          ${ticket.status === 'OPEN' ? 'bg-green-100 text-green-700' : 'bg-gray-200 text-gray-600'}`}>
          {ticket.status}
        </span>
      </div>
      <p className="text-gray-700 whitespace-pre-wrap leading-relaxed">{ticket.description}</p>
      <div className="mt-6 text-sm text-gray-500 border-t pt-4">
        <span className="mr-4">Category: <strong>{ticket.category.name}</strong></span>
        <span>Created: {new Date(ticket.createdAt).toLocaleString()}</span>
      </div>
    </div>

    {/* Comments Section */}
    <div className="bg-white rounded-xl shadow-md p-6">
      <h2 className="text-2xl font-semibold text-gray-800 mb-6">Conversation</h2>
      <div className="space-y-5">
        {Array.isArray(ticket.comments) && ticket.comments.length > 0 ? (
          ticket.comments.map(comment => (
            <div key={comment._id} className="border-b pb-4">
              <p className="text-gray-800">{comment.body}</p>
              <p className="text-xs text-gray-500 mt-2">
                By <span className="font-medium">{comment.author.name}</span> on {new Date(comment.createdAt).toLocaleString()}
              </p>
            </div>
          ))
        ) : (
          <p className="text-gray-500">No comments yet.</p>
        )}
      </div>

      {/* Add Comment */}
      <div className="mt-8 border-t pt-6">
        <h3 className="text-xl font-semibold mb-3">Add a Reply</h3>
        <form onSubmit={handleComment}>
          <textarea
            rows="4"
            className="w-full border border-gray-300 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Type your comment here..."
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            disabled={isSubmittingComment || ticket.status === 'CLOSED'}
          />
          <div className="text-right mt-3">
            <Button
              type="submit"
              disabled={isSubmittingComment || ticket.status === 'CLOSED'}
              className="px-4 py-2"
            >
              {isSubmittingComment ? 'Posting...' : 'Post Reply'}
            </Button>
          </div>
        </form>
      </div>
    </div>

    {/* Action Buttons */}
    <div className="flex flex-wrap items-center gap-4 mt-8">
      <Button
        onClick={() => handleVote('UPVOTE')}
        disabled={ticket.status === 'CLOSED'}
      >
        👍 Upvote ({ticket.upvotes || 0})
      </Button>
      <Button
        onClick={() => handleVote('DOWNVOTE')}
        disabled={ticket.status === 'CLOSED'}
      >
        👎 Downvote ({ticket.downvotes || 0})
      </Button>
      <Button
        onClick={() => handleStatusChange('CLOSED')}
        disabled={ticket.status === 'CLOSED'}
        className="bg-red-600 hover:bg-red-700 text-white"
      >
        Close Ticket
      </Button>
    </div>
  </div>
);

};

export default TicketDetailPage;