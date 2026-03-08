import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Mail, Lock, ArrowRight, AlertCircle } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useToast } from '../../context/ToastContext';
import Input from '../common/Input';
import Button from '../common/Button';

/**
 * Enhanced Login Form Component
 * Features: Real-time validation, error messages, loading states
 */
const LoginForm = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const { success, error: showError } = useToast();
  
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [serverError, setServerError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Clear field error when user types
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
    
    // Clear server error
    if (serverError) {
      setServerError('');
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    // Email validation
    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }
    
    // Password validation
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }
    
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Clear previous errors
    setErrors({});
    setServerError('');
    
    // Validate form
    const newErrors = validateForm();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setLoading(true);
    
    try {
      const result = await login(formData);
      
      if (result.success) {
        success('Login successful! Welcome back.');
        navigate('/dashboard');
      } else {
        setServerError(result.error || 'Login failed. Please try again.');
        showError(result.error || 'Login failed');
      }
    } catch (err) {
      const errorMessage = 'An unexpected error occurred. Please try again.';
      setServerError(errorMessage);
      showError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md">
      <div className="bg-white rounded-2xl shadow-strong p-8 border-2 border-gray-100">
        {/* Header */}
        <div className="text-center mb-8">
          {/* Logo */}
          <div className="
            inline-flex items-center justify-center 
            w-16 h-16 
            bg-gradient-to-br from-blue-600 to-blue-700
            rounded-2xl 
            mb-4
            shadow-md
          ">
            <span className="text-white text-2xl font-bold">F</span>
          </div>
          
          {/* Title */}
          <h2 className="text-3xl font-bold text-gray-900 mb-2">
            Welcome Back
          </h2>
          <p className="text-gray-600">
            Sign in to your FleetFlow account
          </p>
        </div>

        {/* Server Error Alert */}
        {serverError && (
          <div className="
            mb-6 p-4
            bg-red-50 border-2 border-red-200
            rounded-xl
            flex items-start gap-3
            animate-in slide-in-from-top duration-200
          ">
            <AlertCircle className="h-5 w-5 text-red-500 flex-shrink-0 mt-0.5" />
            <div className="flex-1">
              <p className="text-sm font-semibold text-red-800">
                {serverError}
              </p>
            </div>
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-5">
          <Input
            label="Email Address"
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="you@example.com"
            error={errors.email}
            disabled={loading}
            autoComplete="email"
            icon={<Mail size={20} />}
          />

          <Input
            label="Password"
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="••••••••"
            error={errors.password}
            disabled={loading}
            autoComplete="current-password"
            icon={<Lock size={20} />}
          />

          {/* Forgot Password Link */}
          <div className="flex items-center justify-end">
            <Link
              to="/forgot-password"
              className="
                text-sm font-semibold text-blue-600 
                hover:text-blue-700 hover:underline
                transition-colors duration-200
                focus:outline-none focus:ring-2 focus:ring-blue-500 rounded
              "
            >
              Forgot password?
            </Link>
          </div>

          {/* Submit Button */}
          <Button
            type="submit"
            variant="primary"
            size="lg"
            fullWidth
            loading={loading}
            icon={!loading && <ArrowRight size={20} />}
            className="mt-6"
          >
            {loading ? 'Signing in...' : 'Sign In'}
          </Button>
        </form>

        {/* Divider */}
        <div className="relative my-8">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t-2 border-gray-200"></div>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-4 bg-white text-gray-500 font-medium">
              Don't have an account?
            </span>
          </div>
        </div>

        {/* Register Link */}
        <div className="text-center">
          <Link
            to="/register"
            className="
              inline-flex items-center gap-2
              text-blue-600 hover:text-blue-700 
              font-semibold
              transition-colors duration-200
              focus:outline-none focus:ring-2 focus:ring-blue-500 rounded px-2 py-1
            "
          >
            Create an account
            <ArrowRight size={16} />
          </Link>
        </div>
      </div>

      {/* Additional Help */}
      <p className="mt-6 text-center text-sm text-gray-600">
        Having trouble? {' '}
        <a 
          href="mailto:support@fleetflow.com"
          className="text-blue-600 hover:text-blue-700 font-semibold hover:underline"
        >
          Contact support
        </a>
      </p>
    </div>
  );
};

export default LoginForm;