import api from './api';

/**
 * Asset Service
 * Handles all asset-related API operations
 */
const assetService = {
  /**
   * Get all assets with optional filters
   * @param {Object} params - Query parameters
   * @param {string} params.search - Search query
   * @param {string} params.category - Filter by category
   * @param {string} params.status - Filter by status
   * @param {string} params.condition - Filter by condition
   * @param {string} params.sort - Sort field and direction
   * @param {number} params.page - Page number
   * @param {number} params.limit - Items per page
   * @returns {Promise<Object>} Assets list with pagination
   */
  getAssets: async (params = {}) => {
    const response = await api.get('/assets', { params });
    return response.data;
  },

  /**
   * Get single asset by ID
   * @param {string} id - Asset ID
   * @returns {Promise<Object>} Asset data
   */
  getAsset: async (id) => {
    const response = await api.get(`/assets/${id}`);
    return response.data;
  },

  /**
   * Create new asset
   * @param {Object} assetData - Asset data
   * @param {string} assetData.name - Asset name
   * @param {string} assetData.category - Asset category
   * @param {string} assetData.status - Asset status
   * @param {string} assetData.condition - Asset condition
   * @param {number} assetData.purchasePrice - Purchase price
   * @param {string} assetData.location - Location
   * @param {string} assetData.description - Description
   * @returns {Promise<Object>} Created asset
   */
  createAsset: async (assetData) => {
    const response = await api.post('/assets', assetData);
    return response.data;
  },

  /**
   * Update existing asset
   * @param {string} id - Asset ID
   * @param {Object} assetData - Updated asset data
   * @returns {Promise<Object>} Updated asset
   */
  updateAsset: async (id, assetData) => {
    const response = await api.put(`/assets/${id}`, assetData);
    return response.data;
  },

  /**
   * Delete asset
   * @param {string} id - Asset ID
   * @returns {Promise<Object>} Deletion confirmation
   */
  deleteAsset: async (id) => {
    const response = await api.delete(`/assets/${id}`);
    return response.data;
  },

  /**
   * Get dashboard statistics
   * @returns {Promise<Object>} Dashboard stats
   */
  getStats: async () => {
    const response = await api.get('/assets/stats/dashboard');
    return response.data;
  },

  /**
   * Add maintenance record to asset
   * @param {string} id - Asset ID
   * @param {Object} maintenanceData - Maintenance record data
   * @param {Date} maintenanceData.date - Maintenance date
   * @param {string} maintenanceData.type - Maintenance type
   * @param {string} maintenanceData.description - Description
   * @param {number} maintenanceData.cost - Cost
   * @param {string} maintenanceData.performedBy - Performed by
   * @returns {Promise<Object>} Updated asset with maintenance record
   */
  addMaintenance: async (id, maintenanceData) => {
    const response = await api.post(`/assets/${id}/maintenance`, maintenanceData);
    return response.data;
  },
};

export default assetService;