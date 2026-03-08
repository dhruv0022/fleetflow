import { useState, useEffect } from 'react';
import { ASSET_CATEGORIES, ASSET_STATUSES, ASSET_CONDITIONS } from '../../utils/constants';
import Input from '../common/Input';
import Select from '../common/Select';
import Button from '../common/Button';
import { AlertCircle } from 'lucide-react';

/**
 * Enhanced Asset Form Component
 * Features: Multi-section layout, validation, auto-save indication
 */
const AssetForm = ({ initialData, onSubmit, onCancel, loading }) => {
  const [formData, setFormData] = useState({
    name: '',
    category: '',
    status: 'Active',
    condition: 'Good',
    description: '',
    serialNumber: '',
    purchaseDate: '',
    purchasePrice: '',
    location: '',
    assignedTo: '',
    notes: '',
  });
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});

  // Load initial data if editing
  useEffect(() => {
    if (initialData) {
      setFormData({
        name: initialData.name || '',
        category: initialData.category || '',
        status: initialData.status || 'Active',
        condition: initialData.condition || 'Good',
        description: initialData.description || '',
        serialNumber: initialData.serialNumber || '',
        purchaseDate: initialData.purchaseDate ? initialData.purchaseDate.split('T')[0] : '',
        purchasePrice: initialData.purchasePrice || '',
        location: initialData.location || '',
        assignedTo: initialData.assignedTo || '',
        notes: initialData.notes || '',
      });
    }
  }, [initialData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Clear error when user types
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleBlur = (e) => {
    const { name } = e.target;
    setTouched(prev => ({ ...prev, [name]: true }));
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.name) {
      newErrors.name = 'Asset name is required';
    } else if (formData.name.length < 3) {
      newErrors.name = 'Asset name must be at least 3 characters';
    }
    
    if (!formData.category) {
      newErrors.category = 'Category is required';
    }
    
    if (formData.purchasePrice && isNaN(formData.purchasePrice)) {
      newErrors.purchasePrice = 'Price must be a valid number';
    }
    
    if (formData.purchasePrice && parseFloat(formData.purchasePrice) < 0) {
      newErrors.purchasePrice = 'Price cannot be negative';
    }
    
    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Mark all required fields as touched
    setTouched({
      name: true,
      category: true,
    });
    
    // Validate
    const newErrors = validateForm();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    // Clean up data
    const cleanData = { ...formData };
    
    // Convert empty strings to undefined
    Object.keys(cleanData).forEach(key => {
      if (cleanData[key] === '') {
        cleanData[key] = undefined;
      }
    });
    
    // Convert price to number
    if (cleanData.purchasePrice) {
      cleanData.purchasePrice = parseFloat(cleanData.purchasePrice);
    }

    onSubmit(cleanData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      {/* Basic Information Section */}
      <section>
        <div className="mb-6">
          <h3 className="text-xl font-bold text-gray-900 flex items-center gap-2">
            <span className="
              flex items-center justify-center
              w-8 h-8 
              bg-blue-100 text-blue-600
              rounded-lg font-bold text-sm
            ">
              1
            </span>
            Basic Information
          </h3>
          <p className="text-sm text-gray-600 mt-2 ml-10">
            Essential details about the asset
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <Input
            label="Asset Name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            onBlur={handleBlur}
            error={touched.name ? errors.name : ''}
            required
            placeholder="e.g., Excavator CAT 320D"
            disabled={loading}
          />

          <Select
            label="Category"
            name="category"
            value={formData.category}
            onChange={handleChange}
            onBlur={handleBlur}
            options={ASSET_CATEGORIES}
            error={touched.category ? errors.category : ''}
            required
            disabled={loading}
          />

          <Select
            label="Status"
            name="status"
            value={formData.status}
            onChange={handleChange}
            options={ASSET_STATUSES}
            required
            disabled={loading}
          />

          <Select
            label="Condition"
            name="condition"
            value={formData.condition}
            onChange={handleChange}
            options={ASSET_CONDITIONS}
            required
            disabled={loading}
          />
        </div>

        <div className="mt-5">
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Description
          </label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            rows="3"
            disabled={loading}
            placeholder="Describe the asset, its features, and specifications..."
            className="
              w-full px-4 py-3
              border-2 border-gray-300 rounded-lg
              focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent
              disabled:bg-gray-100 disabled:cursor-not-allowed
              transition-all duration-200
              resize-y
            "
          />
        </div>
      </section>

      {/* Purchase Details Section */}
      <section className="pt-6 border-t-2 border-gray-100">
        <div className="mb-6">
          <h3 className="text-xl font-bold text-gray-900 flex items-center gap-2">
            <span className="
              flex items-center justify-center
              w-8 h-8 
              bg-green-100 text-green-600
              rounded-lg font-bold text-sm
            ">
              2
            </span>
            Purchase Details
          </h3>
          <p className="text-sm text-gray-600 mt-2 ml-10">
            Financial and acquisition information
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <Input
            label="Serial Number"
            name="serialNumber"
            value={formData.serialNumber}
            onChange={handleChange}
            placeholder="e.g., SN123456789"
            disabled={loading}
            helperText="Unique identifier for the asset"
          />

          <Input
            label="Purchase Date"
            type="date"
            name="purchaseDate"
            value={formData.purchaseDate}
            onChange={handleChange}
            disabled={loading}
          />

          <Input
            label="Purchase Price"
            type="number"
            name="purchasePrice"
            value={formData.purchasePrice}
            onChange={handleChange}
            onBlur={handleBlur}
            error={touched.purchasePrice ? errors.purchasePrice : ''}
            placeholder="e.g., 150000"
            min="0"
            step="0.01"
            disabled={loading}
            helperText="Enter amount in USD"
          />

          <Input
            label="Location"
            name="location"
            value={formData.location}
            onChange={handleChange}
            placeholder="e.g., Site A, Warehouse B"
            disabled={loading}
          />
        </div>
      </section>

      {/* Additional Information Section */}
      <section className="pt-6 border-t-2 border-gray-100">
        <div className="mb-6">
          <h3 className="text-xl font-bold text-gray-900 flex items-center gap-2">
            <span className="
              flex items-center justify-center
              w-8 h-8 
              bg-purple-100 text-purple-600
              rounded-lg font-bold text-sm
            ">
              3
            </span>
            Additional Information
          </h3>
          <p className="text-sm text-gray-600 mt-2 ml-10">
            Optional details and notes
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <Input
            label="Assigned To"
            name="assignedTo"
            value={formData.assignedTo}
            onChange={handleChange}
            placeholder="e.g., John Doe, Team A"
            disabled={loading}
            helperText="Person or team responsible for this asset"
          />
        </div>

        <div className="mt-5">
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Notes
          </label>
          <textarea
            name="notes"
            value={formData.notes}
            onChange={handleChange}
            rows="4"
            disabled={loading}
            placeholder="Any additional notes, maintenance history, or special instructions..."
            className="
              w-full px-4 py-3
              border-2 border-gray-300 rounded-lg
              focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent
              disabled:bg-gray-100 disabled:cursor-not-allowed
              transition-all duration-200
              resize-y
            "
          />
        </div>
      </section>

      {/* Form Validation Summary */}
      {Object.keys(errors).length > 0 && (
        <div className="
          p-4
          bg-red-50 border-2 border-red-200
          rounded-xl
          flex items-start gap-3
        ">
          <AlertCircle className="h-5 w-5 text-red-500 flex-shrink-0 mt-0.5" />
          <div>
            <p className="text-sm font-semibold text-red-800 mb-2">
              Please fix the following errors:
            </p>
            <ul className="text-sm text-red-700 space-y-1 list-disc list-inside">
              {Object.values(errors).map((error, index) => (
                <li key={index}>{error}</li>
              ))}
            </ul>
          </div>
        </div>
      )}

      {/* Actions */}
      <div className="flex items-center justify-end gap-4 pt-6 border-t-2 border-gray-100">
        {onCancel && (
          <Button
            type="button"
            variant="outline"
            size="lg"
            onClick={onCancel}
            disabled={loading}
          >
            Cancel
          </Button>
        )}
        
        <Button
          type="submit"
          variant="primary"
          size="lg"
          loading={loading}
        >
          {initialData ? 'Update Asset' : 'Create Asset'}
        </Button>
      </div>
    </form>
  );
};

export default AssetForm;