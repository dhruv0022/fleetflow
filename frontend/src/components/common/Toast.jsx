import { useEffect } from 'react';
import { X, CheckCircle, XCircle, Info, AlertTriangle } from 'lucide-react';
import { useToast } from '../../context/ToastContext';

/**
 * Individual Toast Component
 */
const Toast = ({ toast }) => {
  const { removeToast } = useToast();

  useEffect(() => {
    const timer = setTimeout(() => {
      removeToast(toast.id);
    }, 5000);

    return () => clearTimeout(timer);
  }, [toast.id, removeToast]);

  const types = {
    success: {
      icon: CheckCircle,
      className: 'bg-green-50 text-green-800 border-green-200',
      iconColor: 'text-green-500',
      progressColor: 'bg-green-500',
    },
    error: {
      icon: XCircle,
      className: 'bg-red-50 text-red-800 border-red-200',
      iconColor: 'text-red-500',
      progressColor: 'bg-red-500',
    },
    warning: {
      icon: AlertTriangle,
      className: 'bg-yellow-50 text-yellow-800 border-yellow-200',
      iconColor: 'text-yellow-500',
      progressColor: 'bg-yellow-500',
    },
    info: {
      icon: Info,
      className: 'bg-blue-50 text-blue-800 border-blue-200',
      iconColor: 'text-blue-500',
      progressColor: 'bg-blue-500',
    },
  };

  const config = types[toast.type] || types.info;
  const Icon = config.icon;

  return (
    <div className={`
      relative overflow-hidden
      flex items-start gap-3
      p-4 mb-3 
      rounded-xl border-2 shadow-medium
      transform transition-all duration-300
      animate-in slide-in-from-right fade-in
      ${config.className}
    `}>
      {/* Icon */}
      <Icon className={`h-5 w-5 mt-0.5 flex-shrink-0 ${config.iconColor}`} />
      
      {/* Message */}
      <p className="flex-1 text-sm font-semibold leading-relaxed">
        {toast.message}
      </p>
      
      {/* Close Button */}
      <button
        onClick={() => removeToast(toast.id)}
        className="
          flex-shrink-0 p-1 rounded-lg
          text-gray-400 hover:text-gray-600 hover:bg-white/50
          transition-colors duration-200
          focus:outline-none focus:ring-2 focus:ring-gray-300
        "
        aria-label="Close notification"
      >
        <X className="h-4 w-4" />
      </button>

      {/* Progress Bar */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-gray-200/30">
        <div 
          className={`h-full ${config.progressColor} animate-shrink-width`}
          style={{ animationDuration: '5s' }}
        />
      </div>
    </div>
  );
};

/**
 * Toast Container Component
 * Renders all active toasts
 */
const ToastContainer = () => {
  const { toasts } = useToast();

  if (toasts.length === 0) return null;

  return (
    <div 
      className="
        fixed top-4 right-4 z-50 
        w-96 max-w-full
        pointer-events-none
      "
      aria-live="polite"
      aria-atomic="true"
    >
      <div className="pointer-events-auto">
        {toasts.map(toast => (
          <Toast key={toast.id} toast={toast} />
        ))}
      </div>
    </div>
  );
};

export default ToastContainer;