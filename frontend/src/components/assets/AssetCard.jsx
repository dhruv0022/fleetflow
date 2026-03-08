import { Link } from 'react-router-dom';
import { Package, MapPin, Calendar, DollarSign, Edit, Trash2, Eye } from 'lucide-react';
import { formatCurrency, formatDate } from '../../utils/helpers';
import { STATUS_COLORS, CONDITION_COLORS } from '../../utils/constants';
import Badge from '../common/Badge';
import Button from '../common/Button';

/**
 * Enhanced Asset Card Component
 * Features: Hover effects, gradient header, action buttons, badges
 */
const AssetCard = ({ asset, onEdit, onDelete }) => {
  const statusColor = STATUS_COLORS[asset.status] || STATUS_COLORS.Active;
  const conditionColor = CONDITION_COLORS[asset.condition] || CONDITION_COLORS.Good;

  return (
    <article className="
      group
      bg-white rounded-xl 
      shadow-soft hover:shadow-medium
      border-2 border-gray-100 hover:border-blue-200
      overflow-hidden
      transition-all duration-200
      transform hover:-translate-y-1
    ">
      {/* Asset Image/Icon Header */}
      <div className="
        relative h-48 
        bg-gradient-to-br from-blue-500 via-blue-600 to-blue-700
        flex items-center justify-center
        overflow-hidden
      ">
        {/* Decorative Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)',
            backgroundSize: '20px 20px'
          }} />
        </div>
        
        {/* Icon */}
        <Package size={72} className="text-white/50 relative z-10" />
        
        {/* Category Label */}
        <div className="
          absolute top-4 left-4
          px-3 py-1.5
          bg-white/90 backdrop-blur-sm
          rounded-lg
          text-xs font-bold text-blue-900
          shadow-sm
        ">
          {asset.category}
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        {/* Title */}
        <h3 className="
          text-xl font-bold text-gray-900 
          mb-3
          line-clamp-2
          group-hover:text-blue-600
          transition-colors duration-200
        ">
          {asset.name}
        </h3>

        {/* Badges */}
        <div className="flex flex-wrap items-center gap-2 mb-4">
          <Badge className={statusColor}>
            {asset.status}
          </Badge>
          {asset.condition && (
            <Badge className={conditionColor}>
              {asset.condition}
            </Badge>
          )}
        </div>

        {/* Description */}
        {asset.description && (
          <p className="text-sm text-gray-600 mb-4 line-clamp-2 leading-relaxed">
            {asset.description}
          </p>
        )}

        {/* Details */}
        <div className="space-y-2.5 mb-5">
          {asset.location && (
            <div className="flex items-center gap-2 text-sm text-gray-700">
              <MapPin size={16} className="text-gray-400 flex-shrink-0" />
              <span className="truncate">{asset.location}</span>
            </div>
          )}
          
          {asset.purchasePrice && (
            <div className="flex items-center gap-2 text-sm text-gray-700">
              <DollarSign size={16} className="text-gray-400 flex-shrink-0" />
              <span className="font-semibold text-gray-900">
                {formatCurrency(asset.purchasePrice)}
              </span>
            </div>
          )}
          
          {asset.purchaseDate && (
            <div className="flex items-center gap-2 text-sm text-gray-700">
              <Calendar size={16} className="text-gray-400 flex-shrink-0" />
              <span>Purchased: {formatDate(asset.purchaseDate)}</span>
            </div>
          )}
        </div>

        {/* Actions */}
        <div className="flex items-center gap-2 pt-4 border-t-2 border-gray-100">
          <Link to={`/assets/${asset._id}`} className="flex-1">
            <Button 
              variant="outline" 
              size="sm" 
              fullWidth
              icon={<Eye size={16} />}
            >
              View Details
            </Button>
          </Link>
          
          {onEdit && (
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onEdit(asset)}
              icon={<Edit size={16} />}
              className="p-2.5 text-blue-600 hover:text-blue-700 hover:bg-blue-50"
              ariaLabel="Edit asset"
            />
          )}
          
          {onDelete && (
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onDelete(asset)}
              icon={<Trash2 size={16} />}
              className="p-2.5 text-red-600 hover:text-red-700 hover:bg-red-50"
              ariaLabel="Delete asset"
            />
          )}
        </div>
      </div>
    </article>
  );
};

export default AssetCard;