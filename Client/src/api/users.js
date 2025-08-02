import axios from 'axios';
const API_URL = 'http://localhost:5000/api/users';

// Get all users
export const getUsers = async (token) => {
  const config = { headers: { Authorization: `Bearer ${token}` } };
  const response = await axios.get(API_URL, config);
  return response.data;
};

// Update a user's role
export const updateUserRole = async (userId, role, token) => {
  const config = { headers: { Authorization: `Bearer ${token}` } };
  const response = await axios.patch(`${API_URL}/${userId}/role`, { role }, config);
  return response.data;
};

// Delete a user
export const deleteUser = async (userId, token) => {
  const config = { headers: { Authorization: `Bearer ${token}` } };
  await axios.delete(`${API_URL}/${userId}`, config);
};