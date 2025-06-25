import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const authAPI = {
  register: async (userData) => {
    const response = await api.post('/auth/register', userData);
    return response.data;
  },

  login: async (credentials) => {
    console.log('API: Making login request to /auth/login with:', credentials);
    try {
      const response = await api.post('/auth/login', credentials);
      console.log('API: Login response received:', response.data);
      return response.data;
    } catch (error) {
      console.error('API: Login request failed:', error);
      throw error;
    }
  },
};

export default api;