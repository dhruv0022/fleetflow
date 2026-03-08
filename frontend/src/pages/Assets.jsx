import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { PlusCircle, AlertCircle } from 'lucide-react';
import { useAssets } from '../context/AssetContext';
import { useToast } from '../context/ToastContext';
import Layout from '../components/layout/Layout';
import AssetList from '../components/assets/AssetList';
import AssetFilters from '../components/assets/AssetFilters';
import Button from '../components/common/Button';
import Modal from '../components/common/Modal';

/**
 * Assets Page
 * List all assets with search, filter, and CRUD operations
 */
const Assets = () => {
  const navigate = useNavigate();
  const { 
    assets, 
    loading, 
    filters, 
    pagination,
    updateFilters, 
    resetFilters, 
    fetchAssets, 
    deleteAsset 
  } = useAssets();
  const { success, error: showError } = useToast();
  
  const [deleteModal, setDeleteModal] = useState({ isOpen: false, asset: null });

  useEffect(() => {
    fetchAssets();
  }, [filters]);

  const handleFilterChange = (newFilters) => {
    updateFilters(newFilters);
  };

  const handleEdit = (asset) => {
    navigate(`/assets/${asset._id}/edit`);
  };

  const handleDeleteClick = (asset) => {
    setDeleteModal({ isOpen: true, asset });
  };

  const handleDeleteConfirm = async () => {
    const result = await deleteAsset(deleteModal.asset._id);
    
    if (result.success) {
      success('Asset deleted successfully!');
      setDeleteModal({ isOpen: false, asset: null });
    } else {
      showError(result.error || 'Failed to delete asset');
    }
  };

  return (
    <Layout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Assets</h1>
            <p className="text-gray-600 mt-1">
              Manage your fleet assets and inventory
            </p>
          </div>
          <Button 
            variant="primary" 
            size="lg"
            onClick={() => navigate('/assets/new')}
            icon={<PlusCircle size={20} />}
          >
            Add Asset
          </Button>
        </div>

        {/* Filters */}
        <AssetFilters
          filters={filters}
          onFilterChange={handleFilterChange}
          onReset={resetFilters}
        />

        {/* Results Count */}
        {!loading && assets && (
          <div className="flex items-center justify-between">
            <p className="text-sm text-gray-600">
              Showing <span className="font-bold text-gray-900">{assets.length}</span> of{' '}
              <span className="font-bold text-gray-900">{pagination.total}</span> assets
            </p>
            
            {pagination.pages > 1 && (
              <p className="text-sm text-gray-600">
                Page {pagination.page} of {pagination.pages}
              </p>
            )}
          </div>
        )}

        {/* Asset List */}
        <AssetList
          assets={assets}
          loading={loading}
          onEdit={handleEdit}
          onDelete={handleDeleteClick}
        />

        {/* Pagination (if needed) */}
        {pagination.pages > 1 && (
          <div className="flex justify-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => handleFilterChange({ page: pagination.page - 1 })}
              disabled={pagination.page === 1}
            >
              Previous
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => handleFilterChange({ page: pagination.page + 1 })}
              disabled={pagination.page === pagination.pages}
            >
              Next
            </Button>
          </div>
        )}
      </div>

      {/* Delete Confirmation Modal */}
      <Modal
        isOpen={deleteModal.isOpen}
        onClose={() => setDeleteModal({ isOpen: false, asset: null })}
        title="Delete Asset"
        size="sm"
      >
        <div className="space-y-4">
          {/* Warning Icon */}
          <div className="
            flex items-center justify-center
            w-16 h-16
            bg-red-100 rounded-2xl
            mx-auto
          ">
            <AlertCircle size={32} className="text-red-600" />
          </div>

          {/* Message */}
          <div className="text-center">
            <p className="text-gray-900 font-semibold mb-2">
              Are you sure you want to delete this asset?
            </p>
            <p className="text-sm text-gray-600">
              <strong className="text-gray-900">{deleteModal.asset?.name}</strong>
              {' '}will be permanently deleted. This action cannot be undone.
            </p>
          </div>
          
          {/* Actions */}
          <div className="flex items-center justify-end gap-3 pt-4">
            <Button
              variant="outline"
              onClick={() => setDeleteModal({ isOpen: false, asset: null })}
            >
              Cancel
            </Button>
            <Button
              variant="danger"
              onClick={handleDeleteConfirm}
              loading={loading}
            >
              Delete Asset
            </Button>
          </div>
        </div>
      </Modal>
    </Layout>
  );
};

export default Assets;