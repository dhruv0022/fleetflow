import RegisterForm from '../components/auth/RegisterForm';

/**
 * Register Page
 * Full-screen auth page with gradient background
 */
const Register = () => {
  return (
    <div className="
      min-h-screen 
      bg-gradient-to-br from-blue-50 via-white to-blue-50
      flex items-center justify-center 
      p-4
    ">
      {/* Decorative Background Pattern */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-0 w-96 h-96 bg-blue-200/30 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-purple-200/30 rounded-full blur-3xl translate-x-1/2 translate-y-1/2" />
      </div>

      {/* Register Form */}
      <div className="relative z-10">
        <RegisterForm />
      </div>
    </div>
  );
};

export default Register;