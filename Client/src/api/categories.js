import axios from 'axios';
const API_URL = 'http://localhost:5000/api/categories';

// Get all categories
export const getCategories = async (token) => {
  const config = { headers: { Authorization: `Bearer ${token}` } };
  const response = await axios.get(API_URL, config);
  return response.data;
};

// Create a new category
export const createCategory = async (categoryData, token) => {
  const config = { headers: { Authorization: `Bearer ${token}` } };
  const response = await axios.post(API_URL, categoryData, config);
  return response.data;
};