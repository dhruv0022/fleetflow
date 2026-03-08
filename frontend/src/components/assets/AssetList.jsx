import AssetCard from './AssetCard';
import LoadingSpinner from '../common/LoadingSpinner';
import Skeleton from '../common/Skeleton';
import EmptyState from '../common/EmptyState';
import { Package, PlusCircle } from 'lucide-react';
import Button from '../common/Button';
import { Link } from 'react-router-dom';

/**
 * Enhanced Asset List Component
 * Features: Loading skeletons, empty states, responsive grid
 */
const AssetList = ({ assets, loading, onEdit, onDelete }) => {
  // Loading state with skeletons
  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[...Array(6)].map((_, i) => (
          <div key={i} className="bg-white rounded-xl shadow-soft p-6 border-2 border-gray-100">
            <Skeleton variant="rectangular" height="192px" className="mb-4 rounded-lg" />
            <Skeleton variant="title" className="mb-3" />
            <div className="flex gap-2 mb-4">
              <Skeleton width="80px" height="24px" className="rounded-full" />
              <Skeleton width="80px" height="24px" className="rounded-full" />
            </div>
            <Skeleton count={2} className="mb-2" />
            <div className="pt-4 border-t-2 border-gray-100 mt-4">
              <Skeleton height="40px" className="rounded-lg" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  // Empty state
  if (!assets || assets.length === 0) {
    return (
      <EmptyState
        icon={<Package size={64} />}
        title="No assets found"
        description="Get started by creating your first asset or adjust your filters to see more results."
        action={
          <Link to="/assets/new">
            <Button 
              variant="primary" 
              size="lg"
              icon={<PlusCircle size={20} />}
            >
              Create Your First Asset
            </Button>
          </Link>
        }
      />
    );
  }

  // Asset grid
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {assets.map((asset) => (
        <AssetCard
          key={asset._id}
          asset={asset}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
};

export default AssetList;