import axios from 'axios';

/**
 * Axios instance configured for FleetFlow API
 * Automatically adds JWT token to requests
 * Handles 401 errors (expired tokens)
 */
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5000/api',
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000, // 10 second timeout
});

/**
 * Request Interceptor
 * Automatically adds JWT token to every request
 */
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

/**
 * Response Interceptor
 * Handles common error scenarios globally
 */
api.interceptors.response.use(
  (response) => response,
  (error) => {
    // Network error (backend not running)
    if (!error.response) {
      console.error('Network Error: Backend server may be offline');
      return Promise.reject({
        message: 'Unable to connect to server. Please check your connection.',
        isNetworkError: true,
      });
    }

    // Unauthorized (token expired or invalid)
    if (error.response.status === 401) {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      
      // Only redirect if not already on auth pages
      if (!window.location.pathname.includes('/login') && 
          !window.location.pathname.includes('/register')) {
        window.location.href = '/login';
      }
    }

    // Server error (500)
    if (error.response.status >= 500) {
      console.error('Server Error:', error.response.data);
    }

    return Promise.reject(error);
  }
);

export default api;