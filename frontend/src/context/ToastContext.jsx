import { createContext, useContext, useState, useCallback } from 'react';
import { TOAST_DURATION } from '../utils/constants';

const ToastContext = createContext();

/**
 * Custom hook to use Toast context
 * @throws {Error} If used outside ToastProvider
 */
export const useToast = () => {
  const context = useContext(ToastContext);
  
  if (!context) {
    throw new Error('useToast must be used within ToastProvider');
  }
  
  return context;
};

/**
 * Toast Provider Component
 * Manages toast notifications globally
 */
export const ToastProvider = ({ children }) => {
  const [toasts, setToasts] = useState([]);

  /**
   * Show toast notification
   * @param {string} message - Toast message
   * @param {string} type - Toast type (success, error, warning, info)
   * @param {number} duration - Auto-dismiss duration in ms
   */
  const showToast = useCallback((message, type = 'info', duration = TOAST_DURATION) => {
    const id = Date.now() + Math.random();
    const newToast = { id, message, type };
    
    setToasts(prev => [...prev, newToast]);

    // Auto-remove after duration
    if (duration > 0) {
      setTimeout(() => {
        removeToast(id);
      }, duration);
    }
  }, []);

  /**
   * Remove toast by ID
   * @param {number} id - Toast ID
   */
  const removeToast = useCallback((id) => {
    setToasts(prev => prev.filter(toast => toast.id !== id));
  }, []);

  /**
   * Show success toast
   * @param {string} message - Success message
   */
  const success = useCallback((message) => {
    showToast(message, 'success');
  }, [showToast]);

  /**
   * Show error toast
   * @param {string} message - Error message
   */
  const error = useCallback((message) => {
    showToast(message, 'error');
  }, [showToast]);

  /**
   * Show info toast
   * @param {string} message - Info message
   */
  const info = useCallback((message) => {
    showToast(message, 'info');
  }, [showToast]);

  /**
   * Show warning toast
   * @param {string} message - Warning message
   */
  const warning = useCallback((message) => {
    showToast(message, 'warning');
  }, [showToast]);

  /**
   * Clear all toasts
   */
  const clearAll = useCallback(() => {
    setToasts([]);
  }, []);

  const value = {
    toasts,
    showToast,
    removeToast,
    success,
    error,
    info,
    warning,
    clearAll,
  };

  return (
    <ToastContext.Provider value={value}>
      {children}
    </ToastContext.Provider>
  );
};

export default ToastContext;