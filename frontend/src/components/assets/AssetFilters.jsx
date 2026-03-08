import { Search, X, Filter, SlidersHorizontal } from 'lucide-react';
import { useState } from 'react';
import { ASSET_CATEGORIES, ASSET_STATUSES, ASSET_CONDITIONS, SORT_OPTIONS } from '../../utils/constants';
import Input from '../common/Input';
import Select from '../common/Select';
import Button from '../common/Button';

/**
 * Enhanced Asset Filters Component
 * Features: Collapsible advanced filters, clear filters button, search
 */
const AssetFilters = ({ filters, onFilterChange, onReset }) => {
  const [showAdvanced, setShowAdvanced] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    onFilterChange({ [name]: value });
  };

  const hasActiveFilters = 
    filters.search || 
    filters.category || 
    filters.status || 
    filters.condition ||
    filters.sort !== '-createdAt';

  return (
    <div className="bg-white rounded-xl shadow-soft border-2 border-gray-100 p-6">
      {/* Main Filters Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Search */}
        <div className="lg:col-span-2">
          <Input
            type="text"
            name="search"
            value={filters.search}
            onChange={handleChange}
            placeholder="Search assets by name or description..."
            icon={<Search size={20} />}
            className="mb-0"
          />
        </div>

        {/* Category Filter */}
        <Select
          name="category"
          value={filters.category}
          onChange={handleChange}
          options={ASSET_CATEGORIES}
          placeholder="All Categories"
          className="mb-0"
        />

        {/* Status Filter */}
        <Select
          name="status"
          value={filters.status}
          onChange={handleChange}
          options={ASSET_STATUSES}
          placeholder="All Statuses"
          className="mb-0"
        />
      </div>

      {/* Advanced Filters Toggle */}
      <div className="mt-4 flex items-center justify-between">
        <button
          onClick={() => setShowAdvanced(!showAdvanced)}
          className="
            flex items-center gap-2
            px-3 py-2 rounded-lg
            text-sm font-semibold text-gray-700
            hover:bg-gray-50 hover:text-gray-900
            transition-colors duration-200
            focus:outline-none focus:ring-2 focus:ring-blue-500
          "
        >
          <SlidersHorizontal size={16} />
          {showAdvanced ? 'Hide' : 'Show'} Advanced Filters
        </button>

        {hasActiveFilters && (
          <Button
            variant="ghost"
            size="sm"
            onClick={onReset}
            icon={<X size={16} />}
            className="text-gray-600 hover:text-gray-900"
          >
            Clear All Filters
          </Button>
        )}
      </div>

      {/* Advanced Filters */}
      {showAdvanced && (
        <div className="
          mt-4 pt-4 
          border-t-2 border-gray-100
          grid grid-cols-1 md:grid-cols-3 gap-4
          animate-in slide-in-from-top duration-200
        ">
          {/* Condition Filter */}
          <Select
            label="Condition"
            name="condition"
            value={filters.condition}
            onChange={handleChange}
            options={ASSET_CONDITIONS}
            placeholder="All Conditions"
            className="mb-0"
          />

          {/* Sort */}
          <Select
            label="Sort By"
            name="sort"
            value={filters.sort}
            onChange={handleChange}
            options={SORT_OPTIONS}
            className="mb-0"
          />

          {/* Placeholder for future filter */}
          <div className="flex items-end">
            <div className="
              w-full p-3
              bg-gray-50 rounded-lg
              border-2 border-dashed border-gray-300
              text-center text-sm text-gray-500
            ">
              More filters coming soon
            </div>
          </div>
        </div>
      )}

      {/* Active Filters Summary */}
      {hasActiveFilters && (
        <div className="mt-4 pt-4 border-t-2 border-gray-100">
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-sm font-semibold text-gray-700">
              Active filters:
            </span>
            
            {filters.search && (
              <span className="
                inline-flex items-center gap-1
                px-3 py-1
                bg-blue-50 text-blue-700
                rounded-full text-xs font-semibold
                border border-blue-200
              ">
                Search: {filters.search}
                <button 
                  onClick={() => onFilterChange({ search: '' })}
                  className="hover:text-blue-900"
                >
                  <X size={14} />
                </button>
              </span>
            )}
            
            {filters.category && (
              <span className="
                inline-flex items-center gap-1
                px-3 py-1
                bg-green-50 text-green-700
                rounded-full text-xs font-semibold
                border border-green-200
              ">
                Category: {filters.category}
                <button 
                  onClick={() => onFilterChange({ category: '' })}
                  className="hover:text-green-900"
                >
                  <X size={14} />
                </button>
              </span>
            )}
            
            {filters.status && (
              <span className="
                inline-flex items-center gap-1
                px-3 py-1
                bg-yellow-50 text-yellow-700
                rounded-full text-xs font-semibold
                border border-yellow-200
              ">
                Status: {filters.status}
                <button 
                  onClick={() => onFilterChange({ status: '' })}
                  className="hover:text-yellow-900"
                >
                  <X size={14} />
                </button>
              </span>
            )}
            
            {filters.condition && (
              <span className="
                inline-flex items-center gap-1
                px-3 py-1
                bg-purple-50 text-purple-700
                rounded-full text-xs font-semibold
                border border-purple-200
              ">
                Condition: {filters.condition}
                <button 
                  onClick={() => onFilterChange({ condition: '' })}
                  className="hover:text-purple-900"
                >
                  <X size={14} />
                </button>
              </span>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default AssetFilters;