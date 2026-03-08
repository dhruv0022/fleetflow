import { createContext, useContext, useState, useEffect } from 'react';
import authService from '../services/authService';

const AuthContext = createContext();

/**
 * Custom hook to use Auth context
 * @throws {Error} If used outside AuthProvider
 */
export const useAuth = () => {
  const context = useContext(AuthContext);
  
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  
  return context;
};

/**
 * Auth Provider Component
 * Manages authentication state globally
 */
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  /**
   * Initialize authentication state on mount
   * Checks localStorage for existing token and user
   */
  useEffect(() => {
    const initAuth = () => {
      try {
        const token = authService.getToken();
        const storedUser = authService.getStoredUser();
        
        if (token && storedUser) {
          setUser(storedUser);
          setIsAuthenticated(true);
        }
      } catch (error) {
        console.error('Auth initialization error:', error);
        authService.logout();
      } finally {
        setLoading(false);
      }
    };

    initAuth();
  }, []);

  /**
   * Register new user
   * @param {Object} userData - Registration data
   * @returns {Promise<Object>} Result object with success status
   */
  const register = async (userData) => {
    try {
      const response = await authService.register(userData);
      
      if (response.success) {
        setUser(response.data.user);
        setIsAuthenticated(true);
        return { success: true, data: response.data };
      }
      
      return { success: false, error: response.error || 'Registration failed' };
    } catch (error) {
      const errorMessage = error.response?.data?.error || 
                          error.message || 
                          'Registration failed. Please try again.';
      
      return { success: false, error: errorMessage };
    }
  };

  /**
   * Login user
   * @param {Object} credentials - Login credentials
   * @returns {Promise<Object>} Result object with success status
   */
  const login = async (credentials) => {
    try {
      const response = await authService.login(credentials);
      
      if (response.success) {
        setUser(response.data.user);
        setIsAuthenticated(true);
        return { success: true, data: response.data };
      }
      
      return { success: false, error: response.error || 'Login failed' };
    } catch (error) {
      const errorMessage = error.response?.data?.error || 
                          error.message || 
                          'Login failed. Please check your credentials.';
      
      return { success: false, error: errorMessage };
    }
  };

  /**
   * Logout user
   * Clears auth state and redirects to login
   */
  const logout = () => {
    authService.logout();
    setUser(null);
    setIsAuthenticated(false);
  };

  /**
   * Update user profile
   * @param {Object} updatedData - Updated user data
   * @returns {Promise<Object>} Result object
   */
  const updateProfile = async (updatedData) => {
    try {
      const response = await authService.updateProfile(updatedData);
      
      if (response.success) {
        setUser(response.data);
        return { success: true, data: response.data };
      }
      
      return { success: false, error: response.error || 'Update failed' };
    } catch (error) {
      const errorMessage = error.response?.data?.error || 
                          error.message || 
                          'Failed to update profile.';
      
      return { success: false, error: errorMessage };
    }
  };

  /**
   * Update user in state (without API call)
   * Used when backend returns updated user data
   * @param {Object} updatedUser - Updated user object
   */
  const updateUser = (updatedUser) => {
    setUser(updatedUser);
    localStorage.setItem('user', JSON.stringify(updatedUser));
  };

  /**
   * Refresh user data from API
   * @returns {Promise<boolean>} Success status
   */
  const refreshUser = async () => {
    try {
      const response = await authService.getCurrentUser();
      
      if (response.success) {
        setUser(response.data);
        localStorage.setItem('user', JSON.stringify(response.data));
        return true;
      }
      
      return false;
    } catch (error) {
      console.error('Failed to refresh user:', error);
      return false;
    }
  };

  const value = {
    user,
    loading,
    isAuthenticated,
    register,
    login,
    logout,
    updateProfile,
    updateUser,
    refreshUser,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;