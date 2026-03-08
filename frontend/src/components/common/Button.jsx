import { Loader2 } from 'lucide-react';

/**
 * Enhanced Button Component
 * Implements all button states: hover, active, focus, disabled, loading
 * Follows Fitts's Law with adequate touch targets (min 44px height)
 */
const Button = ({ 
  children, 
  onClick, 
  type = 'button', 
  variant = 'primary', 
  size = 'md',
  disabled = false,
  fullWidth = false,
  loading = false,
  icon,
  className = '',
  ariaLabel,
}) => {
  const baseStyles = `
    inline-flex items-center justify-center
    font-semibold rounded-lg
    transition-all duration-200 ease-out
    focus:outline-none focus:ring-2 focus:ring-offset-2
    disabled:opacity-50 disabled:cursor-not-allowed disabled:pointer-events-none
    active:scale-[0.98]
  `;
  
  const variants = {
    primary: `
      bg-blue-600 hover:bg-blue-700 active:bg-blue-800
      text-white
      shadow-sm hover:shadow-md
      focus:ring-blue-500
      hover:-translate-y-0.5
    `,
    secondary: `
      bg-white hover:bg-gray-50 active:bg-gray-100
      text-gray-700 hover:text-gray-900
      border-2 border-gray-300 hover:border-gray-400
      shadow-sm hover:shadow-md
      focus:ring-gray-500
    `,
    danger: `
      bg-red-600 hover:bg-red-700 active:bg-red-800
      text-white
      shadow-sm hover:shadow-md
      focus:ring-red-500
      hover:-translate-y-0.5
    `,
    success: `
      bg-green-600 hover:bg-green-700 active:bg-green-800
      text-white
      shadow-sm hover:shadow-md
      focus:ring-green-500
      hover:-translate-y-0.5
    `,
    outline: `
      bg-transparent hover:bg-blue-50 active:bg-blue-100
      text-blue-600 hover:text-blue-700
      border-2 border-blue-600 hover:border-blue-700
      focus:ring-blue-500
    `,
    ghost: `
      bg-transparent hover:bg-gray-100 active:bg-gray-200
      text-gray-700 hover:text-gray-900
      focus:ring-gray-500
    `,
  };
  
  const sizes = {
    sm: 'px-4 py-2 text-sm min-h-[36px] gap-2',
    md: 'px-6 py-3 text-base min-h-[44px] gap-2',
    lg: 'px-8 py-4 text-lg min-h-[52px] gap-3',
  };
  
  const widthClass = fullWidth ? 'w-full' : '';
  const isDisabled = disabled || loading;

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={isDisabled}
      aria-label={ariaLabel || (typeof children === 'string' ? children : undefined)}
      aria-busy={loading}
      className={`
        ${baseStyles}
        ${variants[variant]}
        ${sizes[size]}
        ${widthClass}
        ${className}
      `}
    >
      {loading ? (
        <>
          <Loader2 className="animate-spin" size={size === 'sm' ? 16 : size === 'lg' ? 24 : 20} />
          <span>Loading...</span>
        </>
      ) : (
        <>
          {icon && <span className="flex-shrink-0">{icon}</span>}
          {children}
        </>
      )}
    </button>
  );
};

export default Button;