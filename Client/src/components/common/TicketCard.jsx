import React from 'react';
import { Link } from 'react-router-dom';

// A simple function to give status badges different colors
const getStatusClass = (status) => {
  switch (status.toUpperCase()) {
    case 'OPEN':
      return 'bg-blue-100 text-blue-800';
    case 'IN_PROGRESS':
      return 'bg-yellow-100 text-yellow-800';
    case 'RESOLVED':
      return 'bg-green-100 text-green-800';
    case 'CLOSED':
      return 'bg-gray-100 text-gray-800';
    default:
      return 'bg-gray-100 text-gray-800';
  }
};

const TicketCard = ({ ticket }) => {
return (
  <Link to={`/tickets/${ticket._id}`} className="block">
    <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-200 hover:shadow-md hover:border-blue-500 transition duration-200">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold text-gray-800">{ticket.subject}</h3>
        <span
          className={`px-3 py-1 text-xs font-medium rounded-full ${getStatusClass(
            ticket.status
          )}`}
        >
          {ticket.status}
        </span>
      </div>
      <p className="text-sm text-gray-600 mt-2 line-clamp-2">{ticket.description}</p>
      <div className="mt-4 text-right text-xs text-gray-400">
        Last Updated: {new Date(ticket.updatedAt).toLocaleDateString()}
      </div>
    </div>
  </Link>
);

};

export default TicketCard;