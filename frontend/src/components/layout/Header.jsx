import { useState, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Menu, User, LogOut, Settings, LayoutDashboard, ChevronDown } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { getInitials } from '../../utils/helpers';

/**
 * Enhanced Header Component
 * Features: Sticky positioning, user dropdown, mobile menu trigger
 */
const Header = ({ onMenuClick }) => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [showUserMenu, setShowUserMenu] = useState(false);
  const dropdownRef = useRef(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowUserMenu(false);
      }
    };

    if (showUserMenu) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showUserMenu]);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <header className="
      bg-white 
      border-b-2 border-gray-100 
      sticky top-0 z-40
      shadow-sm
    ">
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          
          {/* Left Section - Logo & Menu Button */}
          <div className="flex items-center gap-4">
            {/* Mobile Menu Button */}
            <button
              onClick={onMenuClick}
              className="
                lg:hidden
                p-2 rounded-lg
                text-gray-600 hover:text-gray-900 hover:bg-gray-100
                transition-colors duration-200
                focus:outline-none focus:ring-2 focus:ring-blue-500
              "
              aria-label="Open menu"
            >
              <Menu size={24} />
            </button>
            
            {/* Logo */}
            <Link 
              to="/dashboard" 
              className="
                flex items-center gap-3
                group
                focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-lg
              "
            >
              {/* Logo Icon */}
              <div className="
                h-10 w-10 
                bg-gradient-to-br from-blue-600 to-blue-700
                rounded-xl 
                flex items-center justify-center
                shadow-md
                group-hover:shadow-lg
                transform group-hover:scale-105
                transition-all duration-200
              ">
                <span className="text-white font-bold text-xl">F</span>
              </div>
              
              {/* Logo Text */}
              <div className="hidden sm:block">
                <span className="text-xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors">
                  FleetFlow
                </span>
                <p className="text-xs text-gray-500 -mt-1">Asset Management</p>
              </div>
            </Link>
          </div>

          {/* Right Section - User Menu */}
          <div className="flex items-center gap-3">
            {/* User Dropdown */}
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setShowUserMenu(!showUserMenu)}
                className="
                  flex items-center gap-3 
                  px-3 py-2 rounded-xl
                  hover:bg-gray-50
                  transition-all duration-200
                  focus:outline-none focus:ring-2 focus:ring-blue-500
                  group
                "
                aria-expanded={showUserMenu}
                aria-haspopup="true"
              >
                {/* Avatar */}
                <div className="
                  h-10 w-10
                  bg-gradient-to-br from-blue-500 to-blue-600
                  rounded-full
                  flex items-center justify-center
                  text-white font-semibold text-sm
                  shadow-sm
                  group-hover:shadow-md
                  transition-shadow duration-200
                ">
                  {getInitials(user?.username || 'User')}
                </div>
                
                {/* User Info - Hidden on mobile */}
                <div className="hidden md:block text-left">
                  <p className="text-sm font-semibold text-gray-900">
                    {user?.username}
                  </p>
                  <p className="text-xs text-gray-500 capitalize">
                    {user?.role}
                  </p>
                </div>

                {/* Dropdown Arrow */}
                <ChevronDown 
                  size={16} 
                  className={`
                    hidden md:block text-gray-400
                    transition-transform duration-200
                    ${showUserMenu ? 'rotate-180' : ''}
                  `}
                />
              </button>

              {/* Dropdown Menu */}
              {showUserMenu && (
                <div className="
                  absolute right-0 mt-2 
                  w-64
                  bg-white rounded-xl shadow-strong border-2 border-gray-100
                  py-2
                  animate-in fade-in slide-in-from-top-2 duration-200
                ">
                  {/* User Info Header - Visible on mobile */}
                  <div className="px-4 py-3 border-b-2 border-gray-100 md:hidden">
                    <p className="text-sm font-semibold text-gray-900">
                      {user?.username}
                    </p>
                    <p className="text-xs text-gray-500">
                      {user?.email}
                    </p>
                  </div>

                  {/* Desktop User Info */}
                  <div className="hidden md:block px-4 py-3 border-b-2 border-gray-100">
                    <p className="text-sm font-semibold text-gray-900">
                      {user?.username}
                    </p>
                    <p className="text-xs text-gray-500 mt-0.5">
                      {user?.email}
                    </p>
                  </div>
                  
                  {/* Menu Items */}
                  <div className="py-2">
                    <Link
                      to="/dashboard"
                      className="
                        flex items-center gap-3
                        px-4 py-2.5
                        text-sm font-medium text-gray-700
                        hover:bg-blue-50 hover:text-blue-700
                        transition-colors duration-200
                      "
                      onClick={() => setShowUserMenu(false)}
                    >
                      <LayoutDashboard size={18} />
                      Dashboard
                    </Link>
                    
                    <Link
                      to="/profile"
                      className="
                        flex items-center gap-3
                        px-4 py-2.5
                        text-sm font-medium text-gray-700
                        hover:bg-blue-50 hover:text-blue-700
                        transition-colors duration-200
                      "
                      onClick={() => setShowUserMenu(false)}
                    >
                      <User size={18} />
                      Profile
                    </Link>
                    
                    <Link
                      to="/settings"
                      className="
                        flex items-center gap-3
                        px-4 py-2.5
                        text-sm font-medium text-gray-700
                        hover:bg-blue-50 hover:text-blue-700
                        transition-colors duration-200
                      "
                      onClick={() => setShowUserMenu(false)}
                    >
                      <Settings size={18} />
                      Settings
                    </Link>
                  </div>
                  
                  {/* Logout */}
                  <div className="border-t-2 border-gray-100 pt-2">
                    <button
                      onClick={handleLogout}
                      className="
                        flex items-center gap-3
                        w-full px-4 py-2.5
                        text-sm font-medium text-red-600
                        hover:bg-red-50
                        transition-colors duration-200
                      "
                    >
                      <LogOut size={18} />
                      Logout
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;