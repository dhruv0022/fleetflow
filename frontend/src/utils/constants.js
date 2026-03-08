/**
 * Application Constants
 * Centralized constants for consistent data across the app
 */

// Asset Categories
export const ASSET_CATEGORIES = [
  'Equipment',
  'Vehicle',
  'Tool',
  'Furniture',
  'Electronics',
  'Other',
];

// Asset Statuses
export const ASSET_STATUSES = [
  'Active',
  'Inactive',
  'Maintenance',
  'Retired',
];

// Asset Conditions
export const ASSET_CONDITIONS = [
  'Excellent',
  'Good',
  'Fair',
  'Poor',
];

// Maintenance Types
export const MAINTENANCE_TYPES = [
  'Routine',
  'Repair',
  'Inspection',
  'Upgrade',
  'Emergency',
];

// Sort Options
export const SORT_OPTIONS = [
  { label: 'Newest First', value: '-createdAt' },
  { label: 'Oldest First', value: 'createdAt' },
  { label: 'Name (A-Z)', value: 'name' },
  { label: 'Name (Z-A)', value: '-name' },
  { label: 'Price (High-Low)', value: '-purchasePrice' },
  { label: 'Price (Low-High)', value: 'purchasePrice' },
];

// Status Colors (Tailwind classes)
export const STATUS_COLORS = {
  Active: 'bg-green-100 text-green-800 border-green-200',
  Inactive: 'bg-gray-100 text-gray-800 border-gray-200',
  Maintenance: 'bg-yellow-100 text-yellow-800 border-yellow-200',
  Retired: 'bg-red-100 text-red-800 border-red-200',
};

// Condition Colors (Tailwind classes)
export const CONDITION_COLORS = {
  Excellent: 'bg-green-100 text-green-800 border-green-200',
  Good: 'bg-blue-100 text-blue-800 border-blue-200',
  Fair: 'bg-yellow-100 text-yellow-800 border-yellow-200',
  Poor: 'bg-red-100 text-red-800 border-red-200',
};

// Pagination defaults
export const DEFAULT_PAGE_SIZE = 12;
export const PAGE_SIZE_OPTIONS = [6, 12, 24, 48];

// Animation durations (ms)
export const ANIMATION_DURATION = {
  fast: 150,
  normal: 200,
  slow: 300,
};

// Toast auto-dismiss duration (ms)
export const TOAST_DURATION = 5000;

// Debounce delay for search (ms)
export const SEARCH_DEBOUNCE_DELAY = 300;

// Minimum password length
export const MIN_PASSWORD_LENGTH = 6;

// Maximum file upload size (bytes)
export const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB