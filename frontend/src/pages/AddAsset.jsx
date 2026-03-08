import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { useAssets } from '../context/AssetContext';
import { useToast } from '../context/ToastContext';
import Layout from '../components/layout/Layout';
import AssetForm from '../components/assets/AssetForm';
import Card from '../components/common/Card';
import Button from '../components/common/Button';

/**
 * Add Asset Page
 * Create new asset form
 */
const AddAsset = () => {
  const navigate = useNavigate();
  const { createAsset, loading } = useAssets();
  const { success, error: showError } = useToast();

  const handleSubmit = async (assetData) => {
    const result = await createAsset(assetData);
    
    if (result.success) {
      success('Asset created successfully! 🎉');
      navigate('/assets');
    } else {
      showError(result.error || 'Failed to create asset');
    }
  };

  const handleCancel = () => {
    navigate('/assets');
  };

  return (
    <Layout>
      <div className="max-w-4xl mx-auto space-y-6">
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
        <div>
          <h1 className="text-3xl font-bold text-gray-900">
            Add New Asset
          </h1>
          <p className="text-gray-600 mt-1">
            Create a new asset record in your inventory
          </p>
        </div>

        {/* Form Card */}
        <Card>
          <AssetForm
            onSubmit={handleSubmit}
            onCancel={handleCancel}
            loading={loading}
          />
        </Card>
      </div>
    </Layout>
  );
};

export default AddAsset;