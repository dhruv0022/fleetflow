import { Link } from 'react-router-dom';
import { Package, ArrowRight, Clock } from 'lucide-react';
import { getTimeAgo, formatCurrency } from '../../utils/helpers';
import Badge from '../common/Badge';
import { STATUS_COLORS } from '../../utils/constants';

/**
 * Enhanced Recent Assets Component
 * Features: Timeline design, hover effects, relative timestamps
 */
const RecentAssets = ({ assets, loading = false }) => {
  // Loading skeleton
  if (loading) {
    return (
      <div className="space-y-3">
        {[...Array(5)].map((_, i) => (
          <div 
            key={i}
            className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl animate-pulse"
          >
            <div className="h-12 w-12 bg-gray-200 rounded-xl" />
            <div className="flex-1 space-y-2">
              <div className="h-4 bg-gray-200 rounded w-3/4" />
              <div className="h-3 bg-gray-200 rounded w-1/2" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  // Empty state
  if (!assets || assets.length === 0) {
    return (
      <div className="
        text-center py-12
        bg-gray-50 rounded-xl
        border-2 border-dashed border-gray-200
      ">
        <div className="
          inline-flex items-center justify-center
          w-16 h-16
          bg-gray-100 rounded-2xl
          mb-4
        ">
          <Package size={32} className="text-gray-400" />
        </div>
        <p className="text-gray-600 font-medium mb-1">
          No recent assets
        </p>
        <p className="text-sm text-gray-500">
          Assets you create will appear here
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-2">
      {assets.map((asset, index) => {
        const statusColor = STATUS_COLORS[asset.status] || STATUS_COLORS.Active;
        const isLast = index === assets.length - 1;
        
        return (
          <Link
            key={asset._id}
            to={`/assets/${asset._id}`}
            className="
              group
              relative
              flex items-center gap-4 
              p-4 
              bg-gray-50 hover:bg-blue-50
              rounded-xl
              transition-all duration-200
              border-2 border-transparent hover:border-blue-200
            "
          >
            {/* Timeline Line (except for last item) */}
            {!isLast && (
              <div className="
                absolute left-8 top-16 bottom-0
                w-0.5 bg-gray-200
                group-hover:bg-blue-200
                transition-colors duration-200
              " />
            )}

            {/* Icon */}
            <div className="
              relative z-10
              flex items-center justify-center
              h-12 w-12
              bg-gradient-to-br from-blue-500 to-blue-600
              group-hover:from-blue-600 group-hover:to-blue-700
              rounded-xl
              shadow-sm group-hover:shadow-md
              transform group-hover:scale-105
              transition-all duration-200
            ">
              <Package size={24} className="text-white" />
            </div>
            
            {/* Content */}
            <div className="flex-1 min-w-0">
              {/* Asset Name */}
              <p className="
                text-sm font-bold text-gray-900 
                group-hover:text-blue-700
                truncate
                transition-colors duration-200
              ">
                {asset.name}
              </p>
              
              {/* Details Row */}
              <div className="flex items-center gap-2 mt-1 flex-wrap">
                {/* Status Badge */}
                <Badge size="sm" className={statusColor}>
                  {asset.status}
                </Badge>
                
                {/* Separator */}
                <span className="text-gray-300">•</span>
                
                {/* Time */}
                <span className="flex items-center gap-1 text-xs text-gray-500">
                  <Clock size={12} />
                  {getTimeAgo(asset.createdAt)}
                </span>
                
                {/* Price (if available) */}
                {asset.purchasePrice && (
                  <>
                    <span className="text-gray-300">•</span>
                    <span className="text-xs font-semibold text-gray-700">
                      {formatCurrency(asset.purchasePrice)}
                    </span>
                  </>
                )}
              </div>
            </div>

            {/* Arrow Icon */}
            <ArrowRight 
              size={20} 
              className="
                text-gray-400 group-hover:text-blue-600
                transform group-hover:translate-x-1
                transition-all duration-200
                flex-shrink-0
              " 
            />
          </Link>
        );
      })}
    </div>
  );
};

export default RecentAssets;