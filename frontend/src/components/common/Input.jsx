/**
 * Enhanced Input Component
 * Features: Label, error state, icon support, proper accessibility
 */
const Input = ({ 
  label,
  type = 'text',
  name,
  value,
  onChange,
  onBlur,
  placeholder,
  error,
  helperText,
  required = false,
  disabled = false,
  className = '',
  icon,
  autoComplete,
  min,
  max,
  step,
  rows,
}) => {
  const inputId = `input-${name}`;
  const isTextarea = type === 'textarea';

  const baseInputStyles = `
    w-full px-4 py-3 
    border-2 rounded-lg
    text-gray-900 placeholder-gray-400
    transition-all duration-200
    focus:outline-none focus:ring-2 focus:ring-offset-0
    disabled:bg-gray-100 disabled:cursor-not-allowed disabled:text-gray-500
  `;

  const stateStyles = error
    ? 'border-red-300 focus:border-red-500 focus:ring-red-200'
    : 'border-gray-300 focus:border-blue-500 focus:ring-blue-200';

  const iconPadding = icon ? 'pl-11' : '';

  const InputElement = isTextarea ? 'textarea' : 'input';

  return (
    <div className={`mb-4 ${className}`}>
      {/* Label */}
      {label && (
        <label 
          htmlFor={inputId}
          className="block text-sm font-semibold text-gray-700 mb-2"
        >
          {label}
          {required && <span className="text-red-500 ml-1" aria-label="required">*</span>}
        </label>
      )}
      
      {/* Input Container */}
      <div className="relative">
        {/* Icon */}
        {icon && (
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
            <span className="text-gray-400">
              {icon}
            </span>
          </div>
        )}
        
        {/* Input/Textarea */}
        <InputElement
          id={inputId}
          type={isTextarea ? undefined : type}
          name={name}
          value={value}
          onChange={onChange}
          onBlur={onBlur}
          placeholder={placeholder}
          required={required}
          disabled={disabled}
          autoComplete={autoComplete}
          min={min}
          max={max}
          step={step}
          rows={rows}
          aria-invalid={!!error}
          aria-describedby={error ? `${inputId}-error` : helperText ? `${inputId}-helper` : undefined}
          className={`
            ${baseInputStyles}
            ${stateStyles}
            ${iconPadding}
            ${isTextarea ? 'resize-y min-h-[100px]' : ''}
          `}
        />
      </div>
      
      {/* Error Message */}
      {error && (
        <p 
          id={`${inputId}-error`}
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
          id={`${inputId}-helper`}
          className="mt-2 text-sm text-gray-500"
        >
          {helperText}
        </p>
      )}
    </div>
  );
};

export default Input;