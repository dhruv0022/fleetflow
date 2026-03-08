import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Mail, Lock, User, ArrowRight, AlertCircle, CheckCircle2 } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useToast } from '../../context/ToastContext';
import Input from '../common/Input';
import Button from '../common/Button';

/**
 * Enhanced Register Form Component
 * Features: Real-time validation, password strength, error messages
 */
const RegisterForm = () => {
  const navigate = useNavigate();
  const { register } = useAuth();
  const { success, error: showError } = useToast();
  
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [serverError, setServerError] = useState('');
  const [touched, setTouched] = useState({});

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

  const handleBlur = (e) => {
    const { name } = e.target;
    setTouched(prev => ({ ...prev, [name]: true }));
  };

  const validateForm = () => {
    const newErrors = {};
    
    // Username validation
    if (!formData.username) {
      newErrors.username = 'Username is required';
    } else if (formData.username.length < 3) {
      newErrors.username = 'Username must be at least 3 characters';
    } else if (formData.username.length > 30) {
      newErrors.username = 'Username cannot exceed 30 characters';
    } else if (!/^[a-zA-Z0-9_]+$/.test(formData.username)) {
      newErrors.username = 'Username can only contain letters, numbers, and underscores';
    }
    
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
    
    // Confirm password validation
    if (!formData.confirmPassword) {
      newErrors.confirmPassword = 'Please confirm your password';
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }
    
    return newErrors;
  };

  // Password strength indicator
  const getPasswordStrength = () => {
    const password = formData.password;
    if (!password) return null;
    
    let strength = 0;
    if (password.length >= 6) strength++;
    if (password.length >= 10) strength++;
    if (/[a-z]/.test(password) && /[A-Z]/.test(password)) strength++;
    if (/[0-9]/.test(password)) strength++;
    if (/[^a-zA-Z0-9]/.test(password)) strength++;
    
    if (strength <= 2) return { label: 'Weak', color: 'bg-red-500', width: '33%' };
    if (strength <= 3) return { label: 'Medium', color: 'bg-yellow-500', width: '66%' };
    return { label: 'Strong', color: 'bg-green-500', width: '100%' };
  };

  const passwordStrength = getPasswordStrength();

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Mark all fields as touched
    setTouched({
      username: true,
      email: true,
      password: true,
      confirmPassword: true,
    });
    
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
      const result = await register({
        username: formData.username,
        email: formData.email,
        password: formData.password,
      });
      
      if (result.success) {
        success('Account created successfully! Welcome to FleetFlow.');
        navigate('/dashboard');
      } else {
        setServerError(result.error || 'Registration failed. Please try again.');
        showError(result.error || 'Registration failed');
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
            Create Account
          </h2>
          <p className="text-gray-600">
            Start managing your assets with FleetFlow
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
            label="Username"
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
            onBlur={handleBlur}
            placeholder="johndoe"
            error={touched.username ? errors.username : ''}
            disabled={loading}
            autoComplete="username"
            icon={<User size={20} />}
          />

          <Input
            label="Email Address"
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            onBlur={handleBlur}
            placeholder="you@example.com"
            error={touched.email ? errors.email : ''}
            disabled={loading}
            autoComplete="email"
            icon={<Mail size={20} />}
          />

          <div>
            <Input
              label="Password"
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              onBlur={handleBlur}
              placeholder="••••••••"
              error={touched.password ? errors.password : ''}
              disabled={loading}
              autoComplete="new-password"
              icon={<Lock size={20} />}
            />
            
            {/* Password Strength Indicator */}
            {formData.password && passwordStrength && (
              <div className="mt-2 space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-gray-600 font-medium">Password strength:</span>
                  <span className={`font-semibold ${
                    passwordStrength.label === 'Weak' ? 'text-red-600' :
                    passwordStrength.label === 'Medium' ? 'text-yellow-600' :
                    'text-green-600'
                  }`}>
                    {passwordStrength.label}
                  </span>
                </div>
                <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                  <div 
                    className={`h-full ${passwordStrength.color} transition-all duration-300`}
                    style={{ width: passwordStrength.width }}
                  />
                </div>
              </div>
            )}
          </div>

          <Input
            label="Confirm Password"
            type="password"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            onBlur={handleBlur}
            placeholder="••••••••"
            error={touched.confirmPassword ? errors.confirmPassword : ''}
            disabled={loading}
            autoComplete="new-password"
            icon={<Lock size={20} />}
          />

          {/* Password match indicator */}
          {formData.password && formData.confirmPassword && (
            <div className={`
              flex items-center gap-2 text-sm
              ${formData.password === formData.confirmPassword ? 'text-green-600' : 'text-red-600'}
            `}>
              {formData.password === formData.confirmPassword ? (
                <>
                  <CheckCircle2 size={16} />
                  <span className="font-medium">Passwords match</span>
                </>
              ) : (
                <>
                  <AlertCircle size={16} />
                  <span className="font-medium">Passwords don't match</span>
                </>
              )}
            </div>
          )}

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
            {loading ? 'Creating account...' : 'Create Account'}
          </Button>
        </form>

        {/* Terms */}
        <p className="mt-6 text-xs text-center text-gray-500 leading-relaxed">
          By creating an account, you agree to our{' '}
          <a href="#" className="text-blue-600 hover:text-blue-700 font-semibold hover:underline">
            Terms of Service
          </a>{' '}
          and{' '}
          <a href="#" className="text-blue-600 hover:text-blue-700 font-semibold hover:underline">
            Privacy Policy
          </a>
        </p>

        {/* Divider */}
        <div className="relative my-8">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t-2 border-gray-200"></div>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-4 bg-white text-gray-500 font-medium">
              Already have an account?
            </span>
          </div>
        </div>

        {/* Login Link */}
        <div className="text-center">
          <Link
            to="/login"
            className="
              inline-flex items-center gap-2
              text-blue-600 hover:text-blue-700 
              font-semibold
              transition-colors duration-200
              focus:outline-none focus:ring-2 focus:ring-blue-500 rounded px-2 py-1
            "
          >
            Sign in instead
            <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default RegisterForm;