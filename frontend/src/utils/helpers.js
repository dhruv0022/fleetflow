import { format, formatDistanceToNow } from 'date-fns';

/**
 * Utility Helper Functions
 * Reusable functions for formatting and data manipulation
 */

/**
 * Format number as currency (USD)
 * @param {number} amount - Amount to format
 * @returns {string} Formatted currency string
 */
export const formatCurrency = (amount) => {
  if (amount === null || amount === undefined) return 'N/A';
  
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
};

/**
 * Format date to readable string
 * @param {string|Date} date - Date to format
 * @returns {string} Formatted date (e.g., "Feb 22, 2024")
 */
export const formatDate = (date) => {
  if (!date) return 'N/A';
  
  try {
    return format(new Date(date), 'MMM dd, yyyy');
  } catch (error) {
    console.error('Date formatting error:', error);
    return 'Invalid date';
  }
};

/**
 * Format date with time
 * @param {string|Date} date - Date to format
 * @returns {string} Formatted date with time (e.g., "Feb 22, 2024 3:30 PM")
 */
export const formatDateTime = (date) => {
  if (!date) return 'N/A';
  
  try {
    return format(new Date(date), 'MMM dd, yyyy hh:mm a');
  } catch (error) {
    console.error('DateTime formatting error:', error);
    return 'Invalid date';
  }
};

/**
 * Get relative time (e.g., "2 hours ago")
 * @param {string|Date} date - Date to compare
 * @returns {string} Relative time string
 */
export const getTimeAgo = (date) => {
  if (!date) return 'N/A';
  
  try {
    return formatDistanceToNow(new Date(date), { addSuffix: true });
  } catch (error) {
    console.error('Time ago formatting error:', error);
    return 'Unknown time';
  }
};

/**
 * Capitalize first letter of string
 * @param {string} str - String to capitalize
 * @returns {string} Capitalized string
 */
export const capitalize = (str) => {
  if (!str) return '';
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
};

/**
 * Truncate text to specified length
 * @param {string} str - String to truncate
 * @param {number} length - Maximum length
 * @returns {string} Truncated string with ellipsis
 */
export const truncate = (str, length = 50) => {
  if (!str) return '';
  if (str.length <= length) return str;
  return str.substring(0, length).trim() + '...';
};

/**
 * Get initials from name
 * @param {string} name - Full name
 * @returns {string} Initials (max 2 characters)
 */
export const getInitials = (name) => {
  if (!name) return '?';
  
  const words = name.trim().split(' ');
  
  if (words.length === 1) {
    return words[0].charAt(0).toUpperCase();
  }
  
  return (
    words[0].charAt(0).toUpperCase() + 
    words[words.length - 1].charAt(0).toUpperCase()
  );
};

/**
 * Calculate days until date
 * @param {string|Date} date - Target date
 * @returns {number} Days until date (negative if past)
 */
export const daysUntil = (date) => {
  if (!date) return null;
  
  const now = new Date();
  const target = new Date(date);
  const diffInMs = target - now;
  const diffInDays = Math.ceil(diffInMs / (1000 * 60 * 60 * 24));
  
  return diffInDays;
};

/**
 * Get maintenance status based on next maintenance date
 * @param {string|Date} nextMaintenanceDate - Next maintenance date
 * @returns {Object} Status object with status and color
 */
export const getMaintenanceStatus = (nextMaintenanceDate) => {
  if (!nextMaintenanceDate) {
    return { status: 'Unknown', color: 'gray' };
  }
  
  const days = daysUntil(nextMaintenanceDate);
  
  if (days < 0) {
    return { status: 'Overdue', color: 'red' };
  }
  
  if (days <= 7) {
    return { status: 'Due Soon', color: 'yellow' };
  }
  
  return { status: 'Up to Date', color: 'green' };
};

/**
 * Debounce function
 * @param {Function} func - Function to debounce
 * @param {number} wait - Wait time in ms
 * @returns {Function} Debounced function
 */
export const debounce = (func, wait) => {
  let timeout;
  
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
};

/**
 * Validate email format
 * @param {string} email - Email to validate
 * @returns {boolean} True if valid email format
 */
export const isValidEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

/**
 * Generate random ID
 * @returns {string} Random ID
 */
export const generateId = () => {
  return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
};

/**
 * Format number with commas
 * @param {number} num - Number to format
 * @returns {string} Formatted number
 */
export const formatNumber = (num) => {
  if (num === null || num === undefined) return 'N/A';
  return new Intl.NumberFormat('en-US').format(num);
};