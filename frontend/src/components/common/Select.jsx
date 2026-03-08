/**
 * Enhanced Select Component
 * Features: Label, error state, proper accessibility
 */
const Select = ({ 
  label,
  name,
  value,
  onChange,
  options = [],
  placeholder = 'Select...',
  error,
  helperText,
  required = false,
  disabled = false,
  className = '',
}) => {
  const selectId = `select-${name}`;

  const baseSelectStyles = `
    w-full px-4 py-3 
    border-2 rounded-lg
    text-gray-900
    bg-white
    transition-all duration-200
    focus:outline-none focus:ring-2 focus:ring-offset-0
    disabled:bg-gray-100 disabled:cursor-not-allowed disabled:text-gray-500
    appearance-none
    cursor-pointer
  `;

  const stateStyles = error
    ? 'border-red-300 focus:border-red-500 focus:ring-red-200'
    : 'border-gray-300 focus:border-blue-500 focus:ring-blue-200';

  return (
    <div className={`mb-4 ${className}`}>
      {/* Label */}
      {label && (
        <label 
          htmlFor={selectId}
          className="block text-sm font-semibold text-gray-700 mb-2"
        >
          {label}
          {required && <span className="text-red-500 ml-1" aria-label="required">*</span>}
        </label>
      )}
      
      {/* Select Container with Custom Arrow */}
      <div className="relative">
        <select
          id={selectId}
          name={name}
          value={value}
          onChange={onChange}
          required={required}
          disabled={disabled}
          aria-invalid={!!error}
          aria-describedby={error ? `${selectId}-error` : helperText ? `${selectId}-helper` : undefined}
          className={`
            ${baseSelectStyles}
            ${stateStyles}
          `}
        >
          {placeholder && <option value="">{placeholder}</option>}
          
          {options.map((option) => {
            const optionValue = typeof option === 'string' ? option : option.value;
            const optionLabel = typeof option === 'string' ? option : option.label;
            
            return (
              <option key={optionValue} value={optionValue}>
                {optionLabel}
              </option>
            );
          })}
        </select>

        {/* Custom Dropdown Arrow */}
        <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
          <svg 
            className="h-5 w-5 text-gray-400" 
            fill="none" 
            viewBox="0 0 24 24" 
            stroke="currentColor"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={2} 
              d="M19 9l-7 7-7-7" 
            />
          </svg>
        </div>
      </div>
      
      {/* Error Message */}
      {error && (
        <p 
          id={`${selectId}-error`}
          className="mt-2 text-sm text-red-600 flex items-start gap-1"
          role="alert"
        >
          <span className="text-red-500 mt-0.5">⚠</span>
          <span>{error}</span>
        </p>
      )}

      {/* Helper Text */}
      {helperText && !error && (
        <p 
          id={`${selectId}-helper`}
          className="mt-2 text-sm text-gray-500"
        >
          {helperText}
        </p>
      )}
    </div>
  );
};

export default Select;