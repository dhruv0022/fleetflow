import { Link } from 'react-router-dom';
import { Home, Search } from 'lucide-react';
import Button from '../components/common/Button';

/**
 * 404 Not Found Page
 * Shows when user navigates to non-existent route
 */
const NotFound = () => {
  return (
    <div className="
      min-h-screen 
      bg-gradient-to-br from-blue-50 via-white to-blue-50
      flex items-center justify-center 
      p-4
    ">
      <div className="text-center max-w-md">
        {/* 404 Text */}
        <div className="mb-8">
          <h1 className="
            text-9xl font-bold 
            bg-gradient-to-br from-blue-600 to-blue-800
            bg-clip-text text-transparent
          ">
            404
          </h1>
          <div className="flex items-center justify-center gap-2 mt-4">
            <Search size={24} className="text-gray-400" />
            <p className="text-2xl font-semibold text-gray-700">
              Page Not Found
            </p>
          </div>
        </div>

        {/* Message */}
        <p className="text-gray-600 mb-8 leading-relaxed">
          The page you're looking for doesn't exist or has been moved. 
          Let's get you back on track!
        </p>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link to="/dashboard">
            <Button 
              variant="primary" 
              size="lg"
              icon={<Home size={20} />}
              fullWidth
            >
              Go to Dashboard
            </Button>
          </Link>
          <Link to="/assets">
            <Button 
              variant="outline" 
              size="lg"
              fullWidth
            >
              View Assets
            </Button>
          </Link>
        </div>

        {/* Help Text */}
        <p className="mt-8 text-sm text-gray-500">
          Need help? {' '}
          <a 
            href="mailto:support@fleetflow.com"
            className="text-blue-600 hover:text-blue-700 font-semibold hover:underline"
          >
            Contact support
          </a>
        </p>
      </div>
    </div>
  );
};

export default NotFound;