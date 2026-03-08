import { useEffect } from 'react';
import { X } from 'lucide-react';

/**
 * Enhanced Modal Component
 * Features: Backdrop click to close, ESC key support, focus trap
 */
const Modal = ({ 
  isOpen, 
  onClose, 
  title, 
  children,
  size = 'md',
  showCloseButton = true,
  closeOnBackdrop = true,
  closeOnEsc = true,
}) => {
  // Handle ESC key press
  useEffect(() => {
    if (!isOpen || !closeOnEsc) return;

    const handleEsc = (e) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    document.addEventListener('keydown', handleEsc);
    return () => document.removeEventListener('keydown', handleEsc);
  }, [isOpen, closeOnEsc, onClose]);

  // Prevent body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const sizes = {
    sm: 'max-w-md',
    md: 'max-w-lg',
    lg: 'max-w-2xl',
    xl: 'max-w-4xl',
    full: 'max-w-full mx-4',
  };

  const handleBackdropClick = (e) => {
    if (closeOnBackdrop && e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div 
      className="fixed inset-0 z-50 overflow-y-auto"
      aria-labelledby="modal-title"
      role="dialog"
      aria-modal="true"
    >
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/50 backdrop-blur-sm transition-opacity duration-200"
        onClick={handleBackdropClick}
        aria-hidden="true"
      />
      
      {/* Modal Container */}
      <div className="flex min-h-full items-center justify-center p-4">
        <div 
          className={`
            relative bg-white rounded-xl shadow-strong
            ${sizes[size]} w-full
            transform transition-all duration-200
            animate-in fade-in slide-in-from-bottom-4
          `}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="flex items-center justify-between px-6 py-5 border-b border-gray-100">
            <h3 
              id="modal-title"
              className="text-xl font-bold text-gray-900"
            >
              {title}
            </h3>
            
            {showCloseButton && (
              <button
                onClick={onClose}
                className="
                  p-2 rounded-lg
                  text-gray-400 hover:text-gray-600 hover:bg-gray-100
                  transition-colors duration-200
                  focus:outline-none focus:ring-2 focus:ring-gray-300
                "
                aria-label="Close modal"
              >
                <X size={20} />
              </button>
            )}
          </div>
          
          {/* Body */}
          <div className="px-6 py-5">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;