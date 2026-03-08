/**
 * Enhanced Badge Component
 * Used for status indicators, categories, labels
 */
const Badge = ({ 
  children, 
  variant = 'default',
  size = 'md',
  className = '',
  icon,
}) => {
  const variants = {
    default: 'bg-gray-100 text-gray-800 border-gray-200',
    primary: 'bg-blue-100 text-blue-800 border-blue-200',
    success: 'bg-green-100 text-green-800 border-green-200',
    warning: 'bg-yellow-100 text-yellow-800 border-yellow-200',
    danger: 'bg-red-100 text-red-800 border-red-200',
    info: 'bg-blue-100 text-blue-800 border-blue-200',
  };
  
  const sizes = {
    sm: 'px-2 py-0.5 text-xs gap-1',
    md: 'px-3 py-1 text-sm gap-1.5',
    lg: 'px-4 py-1.5 text-base gap-2',
  };

  return (
    <span className={`
      inline-flex items-center
      font-semibold rounded-full
      border
      ${variants[variant]}
      ${sizes[size]}
      ${className}
    `}>
      {icon && <span className="flex-shrink-0">{icon}</span>}
      {children}
    </span>
  );
};

export default Badge;