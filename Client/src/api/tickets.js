import api from './api.js'; // Import our central api instance

// No need to pass the 'token' to every function anymore!
// The interceptor handles it automatically.


export const getTicketStats = async () => {
  const response = await api.get('/tickets/stats');
  return response.data;
};

export const getTickets = async (params = {}) => {
  const response = await api.get('/tickets', { params });
  // Always return an array for compatibility
  return Array.isArray(response.data) ? response.data : (response.data.tickets || []);
};

export const getTicketById = async (ticketId) => {
  const response = await api.get(`/tickets/${ticketId}`);
  return response.data;
};

export const createTicket = async (ticketData) => {
  const response = await api.post('/tickets', ticketData);
  return response.data;
};

export const addComment = async (ticketId, commentData) => {
  const response = await api.post(`/tickets/${ticketId}/comments`, commentData);
  return response.data;
};

export const updateTicketStatus = async (ticketId, status) => {
  const response = await api.patch(`/tickets/${ticketId}/status`, { status });
  return response.data;
};

export const voteOnTicket = async (ticketId, voteType) => {
  const response = await api.post(`/tickets/${ticketId}/vote`, { type: voteType });
  return response.data;
};