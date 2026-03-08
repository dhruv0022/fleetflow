import { TrendingUp, TrendingDown } from 'lucide-react';

/**
 * Enhanced Stat Card Component
 * Features: Icon with gradient background, trend indicators, animations
 */
const StatCard = ({ 
  title, 
  value, 
  icon, 
  color = 'blue', 
  subtitle,
  trend,
  loading = false,
}) => {
  const colors = {
    blue: {
      bg: 'bg-blue-100',
      text: 'text-blue-600',
      gradient: 'from-blue-500 to-blue-600',
    },
    green: {
      bg: 'bg-green-100',
      text: 'text-green-600',
      gradient: 'from-green-500 to-green-600',
    },
    yellow: {
      bg: 'bg-yellow-100',
      text: 'text-yellow-600',
      gradient: 'from-yellow-500 to-yellow-600',
    },
    red: {
      bg: 'bg-red-100',
      text: 'text-red-600',
      gradient: 'from-red-500 to-red-600',
    },
    purple: {
      bg: 'bg-purple-100',
      text: 'text-purple-600',
      gradient: 'from-purple-500 to-purple-600',
    },
    gray: {
      bg: 'bg-gray-100',
      text: 'text-gray-600',
      gradient: 'from-gray-500 to-gray-600',
    },
  };

  const colorConfig = colors[color] || colors.blue;

  if (loading) {
    return (
      <div className="
        bg-white rounded-xl shadow-soft 
        border-2 border-gray-100
        p-6
        animate-pulse
      ">
        <div className="flex items-center justify-between">
          <div className="flex-1">
            <div className="h-4 bg-gray-200 rounded w-24 mb-3" />
            <div className="h-10 bg-gray-200 rounded w-16 mb-2" />
            <div className="h-3 bg-gray-200 rounded w-32" />
          </div>
          <div className={`w-16 h-16 ${colorConfig.bg} rounded-2xl`} />
        </div>
      </div>
    );
  }

  return (
    <article className="
      group
      bg-white rounded-xl shadow-soft 
      hover:shadow-medium
      border-2 border-gray-100 hover:border-blue-200
      p-6
      transition-all duration-200
      transform hover:-translate-y-0.5
    ">
      <div className="flex items-start justify-between">
        {/* Content */}
        <div className="flex-1 min-w-0">
          {/* Title */}
          <p className="
            text-sm font-semibold text-gray-600 
            uppercase tracking-wide
            mb-2
          ">
            {title}
          </p>
          
          {/* Value */}
          <p className="
            text-4xl font-bold text-gray-900 
            mb-2
            tabular-nums
          ">
            {value}
          </p>
          
          {/* Subtitle or Trend */}
          {subtitle && (
            <p className="text-sm text-gray-600">
              {subtitle}
            </p>
          )}

          {trend && (
            <div className={`
              flex items-center gap-1 text-sm font-semibold
              ${trend.direction === 'up' ? 'text-green-600' : 
                trend.direction === 'down' ? 'text-red-600' : 
                'text-gray-600'}
            `}>
              {trend.direction === 'up' && <TrendingUp size={16} />}
              {trend.direction === 'down' && <TrendingDown size={16} />}
              <span>{trend.value}</span>
              {trend.label && <span className="text-gray-500">• {trend.label}</span>}
            </div>
          )}
        </div>
        
        {/* Icon */}
        {icon && (
          <div className={`
            flex items-center justify-center
            w-16 h-16
            bg-gradient-to-br ${colorConfig.gradient}
            rounded-2xl
            shadow-md
            group-hover:shadow-lg
            transform group-hover:scale-105
            transition-all duration-200
          `}>
            <div className="text-white">
              {icon}
            </div>
          </div>
        )}
      </div>
    </article>
  );
};

export default StatCard;