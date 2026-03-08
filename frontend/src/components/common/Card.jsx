/**
 * Enhanced Card Component
 * Provides consistent container styling with optional header
 */
const Card = ({ 
  children, 
  title, 
  subtitle,
  headerAction,
  className = '',
  padding = true,
  hoverable = false,
}) => {
  const hoverStyles = hoverable 
    ? 'hover:shadow-medium transition-shadow duration-200 cursor-pointer' 
    : '';

  return (
    <div className={`
      bg-white rounded-xl shadow-soft
      ${hoverStyles}
      ${className}
    `}>
      {/* Header Section */}
      {(title || subtitle || headerAction) && (
        <div className="px-6 py-5 border-b border-gray-100">
          <div className="flex items-start justify-between gap-4">
            <div className="min-w-0 flex-1">
              {title && (
                <h3 className="text-lg font-bold text-gray-900 truncate">
                  {title}
                </h3>
              )}
              {subtitle && (
                <p className="mt-1 text-sm text-gray-600 line-clamp-2">
                  {subtitle}
                </p>
              )}
            </div>
            {headerAction && (
              <div className="flex-shrink-0">
                {headerAction}
              </div>
            )}
          </div>
        </div>
      )}
      
      {/* Content Section */}
      <div className={padding ? 'p-6' : ''}>
        {children}
      </div>
    </div>
  );
};

export default Card;