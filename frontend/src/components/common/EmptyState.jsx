/**
 * Enhanced Empty State Component
 * Shows when no data is available with helpful messaging
 */
const EmptyState = ({ 
  icon,
  title, 
  description, 
  action,
  className = '',
}) => {
  return (
    <div className={`
      flex flex-col items-center justify-center 
      py-16 px-4
      text-center
      ${className}
    `}>
      {/* Icon */}
      {icon && (
        <div className="
          mb-6 p-4
          bg-gray-100 rounded-2xl
          text-gray-400
        ">
          {icon}
        </div>
      )}
      
      {/* Title */}
      <h3 className="text-xl font-bold text-gray-900 mb-2">
        {title}
      </h3>
      
      {/* Description */}
      {description && (
        <p className="text-base text-gray-600 mb-8 max-w-md">
          {description}
        </p>
      )}
      
      {/* Action Button */}
      {action && (
        <div>
          {action}
        </div>
      )}
    </div>
  );
};

export default EmptyState;