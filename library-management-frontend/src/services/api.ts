import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3000',
});

export const fetchUsers = async () => {
  const response = await api.get('/users');
  return response.data;
};

export const fetchBooks = async () => {
  const response = await api.get('/books');
  return response.data;
};

export default api;
