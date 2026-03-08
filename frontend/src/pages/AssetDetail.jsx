import { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { 
  ArrowLeft, 
  Edit, 
  Trash2, 
  Package, 
  MapPin, 
  Calendar, 
  DollarSign,
  User,
  FileText,
  AlertCircle,
} from 'lucide-react';
import { useAssets } from '../context/AssetContext';
import { useToast } from '../context/ToastContext';
import { formatCurrency, formatDate } from '../utils/helpers';
import { STATUS_COLORS, CONDITION_COLORS } from '../utils/constants';
import Layout from '../components/layout/Layout';
import LoadingSpinner from '../components/common/LoadingSpinner';
import Button from '../components/common/Button';
import Card from '../components/common/Card';
import Badge from '../components/common/Badge';
import Modal from '../components/common/Modal';

/**
 * Asset Detail Page
 * View full details of a single asset
 */
const AssetDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { getAsset, deleteAsset, loading } = useAssets();
  const { success, error: showError } = useToast();
  
  const [asset, setAsset] = useState(null);
  const [deleteModal, setDeleteModal] = useState(false);

  useEffect(() => {
    const loadAsset = async () => {
      const data = await getAsset(id);
      if (data) {
        setAsset(data);
      } else {
        showError('Asset not found');
        navigate('/assets');
      }
    };
    
    loadAsset();
  }, [id]);

  const handleDelete = async () => {
    const result = await deleteAsset(id);
    
    if (result.success) {
      success('Asset deleted successfully!');
      navigate('/assets');
    } else {
      showError(result.error || 'Failed to delete asset');
    }
  };

  if (loading || !asset) {
    return (
      <Layout>
        <LoadingSpinner size="lg" text="Loading asset details..." />
      </Layout>
    );
  }

  const statusColor = STATUS_COLORS[asset.status] || STATUS_COLORS.Active;
  const conditionColor = CONDITION_COLORS[asset.condition] || CONDITION_COLORS.Good;

  return (
    <Layout>
      <div className="max-w-5xl mx-auto space-y-6">
        {/* Back Button */}
        <Button
          variant="ghost"
          size="sm"
          onClick={() => navigate('/assets')}
          icon={<ArrowLeft size={18} />}
        >
          Back to Assets
        </Button>

        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
          <div className="flex-1">
            <h1 className="text-3xl font-bold text-gray-900 mb-3">
              {asset.name}
            </h1>
            <div className="flex flex-wrap items-center gap-2">
              <Badge variant="default">{asset.category}</Badge>
              <Badge className={statusColor}>{asset.status}</Badge>
              {asset.condition && (
                <Badge className={conditionColor}>{asset.condition}</Badge>
              )}
            </div>
          </div>
          
          <div className="flex items-center gap-3">
            <Link to={`/assets/${id}/edit`}>
              <Button 
                variant="outline"
                icon={<Edit size={18} />}
              >
                Edit
              </Button>
            </Link>
            <Button
              variant="danger"
              onClick={() => setDeleteModal(true)}
              icon={<Trash2 size={18} />}
            >
              Delete
            </Button>
          </div>
        </div>

        {/* Image Placeholder */}
        <div className="
          relative h-80 
          bg-gradient-to-br from-blue-500 via-blue-600 to-blue-700
          rounded-2xl 
          flex items-center justify-center
          overflow-hidden
          shadow-md
        ">
          {/* Decorative Pattern */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute inset-0" style={{
              backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)',
              backgroundSize: '20px 20px'
            }} />
          </div>
          
          <Package size={120} className="text-white/50 relative z-10" />
        </div>

        {/* Details Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Basic Information */}
          <Card title="Basic Information">
            <div className="space-y-4">
              {asset.description && (
                <div>
                  <p className="text-sm font-semibold text-gray-700 mb-2">
                    Description
                  </p>
                  <p className="text-gray-900 leading-relaxed">
                    {asset.description}
                  </p>
                </div>
              )}
              
              {asset.serialNumber && (
                <div className="flex items-start gap-3">
                  <FileText size={20} className="text-gray-400 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-sm text-gray-600">Serial Number</p>
                    <p className="font-semibold text-gray-900">{asset.serialNumber}</p>
                  </div>
                </div>
              )}
              
              {asset.location && (
                <div className="flex items-start gap-3">
                  <MapPin size={20} className="text-gray-400 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-sm text-gray-600">Location</p>
                    <p className="font-semibold text-gray-900">{asset.location}</p>
                  </div>
                </div>
              )}
              
              {asset.assignedTo && (
                <div className="flex items-start gap-3">
                  <User size={20} className="text-gray-400 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-sm text-gray-600">Assigned To</p>
                    <p className="font-semibold text-gray-900">{asset.assignedTo}</p>
                  </div>
                </div>
              )}
            </div>
          </Card>

          {/* Purchase Information */}
          <Card title="Purchase Information">
            <div className="space-y-4">
              {asset.purchaseDate && (
                <div className="flex items-start gap-3">
                  <Calendar size={20} className="text-gray-400 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-sm text-gray-600">Purchase Date</p>
                    <p className="font-semibold text-gray-900">
                      {formatDate(asset.purchaseDate)}
                    </p>
                  </div>
                </div>
              )}
              
              {asset.purchasePrice && (
                <div className="flex items-start gap-3">
                  <DollarSign size={20} className="text-gray-400 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-sm text-gray-600">Purchase Price</p>
                    <p className="font-semibold text-gray-900 text-xl">
                      {formatCurrency(asset.purchasePrice)}
                    </p>
                  </div>
                </div>
              )}
              
              <div className="flex items-start gap-3">
                <Calendar size={20} className="text-gray-400 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm text-gray-600">Added to System</p>
                  <p className="font-semibold text-gray-900">
                    {formatDate(asset.createdAt)}
                  </p>
                </div>
              </div>

              {asset.updatedAt && asset.updatedAt !== asset.createdAt && (
                <div className="flex items-start gap-3">
                  <Calendar size={20} className="text-gray-400 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-sm text-gray-600">Last Updated</p>
                    <p className="font-semibold text-gray-900">
                      {formatDate(asset.updatedAt)}
                    </p>
                  </div>
                </div>
              )}
            </div>
          </Card>
        </div>

        {/* Notes */}
        {asset.notes && (
          <Card title="Notes">
            <p className="text-gray-900 whitespace-pre-wrap leading-relaxed">
              {asset.notes}
            </p>
          </Card>
        )}
      </div>

      {/* Delete Modal */}
      <Modal
        isOpen={deleteModal}
        onClose={() => setDeleteModal(false)}
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
              <strong className="text-gray-900">{asset.name}</strong>
              {' '}will be permanently deleted. This action cannot be undone.
            </p>
          </div>
          
          {/* Actions */}
          <div className="flex items-center justify-end gap-3 pt-4">
            <Button
              variant="outline"
              onClick={() => setDeleteModal(false)}
            >
              Cancel
            </Button>
            <Button
              variant="danger"
              onClick={handleDelete}
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

export default AssetDetail;