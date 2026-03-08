import { createContext, useContext, useState } from 'react';
import assetService from '../services/assetService';

const AssetContext = createContext();

/**
 * Custom hook to use Asset context
 * @throws {Error} If used outside AssetProvider
 */
export const useAssets = () => {
  const context = useContext(AssetContext);
  
  if (!context) {
    throw new Error('useAssets must be used within AssetProvider');
  }
  
  return context;
};

/**
 * Asset Provider Component
 * Manages assets state globally
 */
export const AssetProvider = ({ children }) => {
  const [assets, setAssets] = useState([]);
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 12,
    total: 0,
    pages: 0,
  });

  // Filter state
  const [filters, setFilters] = useState({
    search: '',
    category: '',
    status: '',
    condition: '',
    sort: '-createdAt',
  });

  /**
   * Fetch assets with current filters
   * @param {Object} customFilters - Override default filters
   */
  const fetchAssets = async (customFilters = {}) => {
    setLoading(true);
    setError(null);
    
    try {
      const params = { ...filters, ...customFilters };
      
      // Remove empty filters
      Object.keys(params).forEach(key => {
        if (params[key] === '' || params[key] === null || params[key] === undefined) {
          delete params[key];
        }
      });

      const response = await assetService.getAssets(params);
      
      if (response.success) {
        setAssets(response.data);
        setPagination(response.pagination);
      } else {
        setError('Failed to fetch assets');
      }
    } catch (err) {
      const errorMessage = err.response?.data?.error || 
                          err.message || 
                          'Failed to fetch assets';
      setError(errorMessage);
      console.error('Fetch assets error:', err);
    } finally {
      setLoading(false);
    }
  };

  /**
   * Fetch dashboard statistics
   */
  const fetchStats = async () => {
    try {
      const response = await assetService.getStats();
      
      if (response.success) {
        setStats(response.data);
      }
    } catch (err) {
      console.error('Failed to fetch stats:', err);
    }
  };

  /**
   * Get single asset by ID
   * @param {string} id - Asset ID
   * @returns {Promise<Object|null>} Asset data or null
   */
  const getAsset = async (id) => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await assetService.getAsset(id);
      
      if (response.success) {
        return response.data;
      }
      
      return null;
    } catch (err) {
      const errorMessage = err.response?.data?.error || 
                          err.message || 
                          'Failed to fetch asset';
      setError(errorMessage);
      return null;
    } finally {
      setLoading(false);
    }
  };

  /**
   * Create new asset
   * @param {Object} assetData - Asset data
   * @returns {Promise<Object>} Result object
   */
  const createAsset = async (assetData) => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await assetService.createAsset(assetData);
      
      if (response.success) {
        // Refresh assets list
        await fetchAssets();
        return { success: true, data: response.data };
      }
      
      return { success: false, error: 'Failed to create asset' };
    } catch (err) {
      const errorMessage = err.response?.data?.error || 
                          err.message || 
                          'Failed to create asset';
      setError(errorMessage);
      return { success: false, error: errorMessage };
    } finally {
      setLoading(false);
    }
  };

  /**
   * Update existing asset
   * @param {string} id - Asset ID
   * @param {Object} assetData - Updated asset data
   * @returns {Promise<Object>} Result object
   */
  const updateAsset = async (id, assetData) => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await assetService.updateAsset(id, assetData);
      
      if (response.success) {
        // Update local state
        setAssets(prevAssets =>
          prevAssets.map(asset =>
            asset._id === id ? response.data : asset
          )
        );
        
        return { success: true, data: response.data };
      }
      
      return { success: false, error: 'Failed to update asset' };
    } catch (err) {
      const errorMessage = err.response?.data?.error || 
                          err.message || 
                          'Failed to update asset';
      setError(errorMessage);
      return { success: false, error: errorMessage };
    } finally {
      setLoading(false);
    }
  };

  /**
   * Delete asset
   * @param {string} id - Asset ID
   * @returns {Promise<Object>} Result object
   */
  const deleteAsset = async (id) => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await assetService.deleteAsset(id);
      
      if (response.success) {
        // Remove from local state
        setAssets(prevAssets => prevAssets.filter(asset => asset._id !== id));
        
        // Update pagination count
        setPagination(prev => ({
          ...prev,
          total: prev.total - 1,
        }));
        
        return { success: true };
      }
      
      return { success: false, error: 'Failed to delete asset' };
    } catch (err) {
      const errorMessage = err.response?.data?.error || 
                          err.message || 
                          'Failed to delete asset';
      setError(errorMessage);
      return { success: false, error: errorMessage };
    } finally {
      setLoading(false);
    }
  };

  /**
   * Add maintenance record to asset
   * @param {string} id - Asset ID
   * @param {Object} maintenanceData - Maintenance record
   * @returns {Promise<Object>} Result object
   */
  const addMaintenance = async (id, maintenanceData) => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await assetService.addMaintenance(id, maintenanceData);
      
      if (response.success) {
        // Update local state
        setAssets(prevAssets =>
          prevAssets.map(asset =>
            asset._id === id ? response.data : asset
          )
        );
        
        return { success: true, data: response.data };
      }
      
      return { success: false, error: 'Failed to add maintenance record' };
    } catch (err) {
      const errorMessage = err.response?.data?.error || 
                          err.message || 
                          'Failed to add maintenance record';
      setError(errorMessage);
      return { success: false, error: errorMessage };
    } finally {
      setLoading(false);
    }
  };

  /**
   * Update filters
   * @param {Object} newFilters - New filter values
   */
  const updateFilters = (newFilters) => {
    setFilters(prev => ({ ...prev, ...newFilters }));
  };

  /**
   * Reset filters to defaults
   */
  const resetFilters = () => {
    setFilters({
      search: '',
      category: '',
      status: '',
      condition: '',
      sort: '-createdAt',
    });
  };

  /**
   * Clear error state
   */
  const clearError = () => {
    setError(null);
  };

  const value = {
    assets,
    stats,
    loading,
    error,
    pagination,
    filters,
    fetchAssets,
    fetchStats,
    getAsset,
    createAsset,
    updateAsset,
    deleteAsset,
    addMaintenance,
    updateFilters,
    resetFilters,
    clearError,
  };

  return (
    <AssetContext.Provider value={value}>
      {children}
    </AssetContext.Provider>
  );
};

export default AssetContext;