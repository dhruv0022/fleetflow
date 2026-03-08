import api from './api';

/**
 * Authentication Service
 * Handles user registration, login, and profile management
 */
const authService = {
  /**
   * Register new user
   * @param {Object} userData - User registration data
   * @param {string} userData.username - Username
   * @param {string} userData.email - Email address
   * @param {string} userData.password - Password
   * @returns {Promise<Object>} Response with user and token
   */
  register: async (userData) => {
    const response = await api.post('/auth/register', userData);
    
    if (response.data.success && response.data.data.token) {
      localStorage.setItem('token', response.data.data.token);
      localStorage.setItem('user', JSON.stringify(response.data.data.user));
    }
    
    return response.data;
  },

  /**
   * Login user
   * @param {Object} credentials - Login credentials
   * @param {string} credentials.email - Email address
   * @param {string} credentials.password - Password
   * @returns {Promise<Object>} Response with user and token
   */
  login: async (credentials) => {
    const response = await api.post('/auth/login', credentials);
    
    if (response.data.success && response.data.data.token) {
      localStorage.setItem('token', response.data.data.token);
      localStorage.setItem('user', JSON.stringify(response.data.data.user));
    }
    
    return response.data;
  },

  /**
   * Logout user
   * Clears local storage and authentication state
   */
  logout: () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  },

  /**
   * Get current authenticated user from API
   * @returns {Promise<Object>} Current user data
   */
  getCurrentUser: async () => {
    const response = await api.get('/auth/me');
    return response.data;
  },

  /**
   * Update user profile
   * @param {Object} userData - Updated user data
   * @param {string} userData.username - New username
   * @param {string} userData.email - New email
   * @returns {Promise<Object>} Updated user data
   */
  updateProfile: async (userData) => {
    const response = await api.put('/auth/profile', userData);
    
    if (response.data.success && response.data.data) {
      localStorage.setItem('user', JSON.stringify(response.data.data));
    }
    
    return response.data;
  },

  /**
   * Update user password
   * @param {Object} passwordData - Password change data
   * @param {string} passwordData.currentPassword - Current password
   * @param {string} passwordData.newPassword - New password
   * @returns {Promise<Object>} Response with new token
   */
  updatePassword: async (passwordData) => {
    const response = await api.put('/auth/password', passwordData);
    
    if (response.data.success && response.data.data.token) {
      localStorage.setItem('token', response.data.data.token);
    }
    
    return response.data;
  },

  /**
   * Get stored user from localStorage
   * @returns {Object|null} User object or null
   */
  getStoredUser: () => {
    try {
      const user = localStorage.getItem('user');
      return user ? JSON.parse(user) : null;
    } catch (error) {
      console.error('Error parsing stored user:', error);
      return null;
    }
  },

  /**
   * Get stored token from localStorage
   * @returns {string|null} JWT token or null
   */
  getToken: () => {
    return localStorage.getItem('token');
  },

  /**
   * Check if user is authenticated
   * @returns {boolean} True if token exists
   */
  isAuthenticated: () => {
    return !!localStorage.getItem('token');
  },
};

export default authService;