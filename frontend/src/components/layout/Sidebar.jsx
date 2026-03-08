import { Link, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Package, 
  PlusCircle, 
  Settings,
  X,
  HelpCircle,
} from 'lucide-react';

/**
 * Enhanced Sidebar Component
 * Features: Active state highlighting, responsive design, smooth animations
 */
const Sidebar = ({ isOpen, onClose }) => {
  const location = useLocation();

  const navigation = [
    { 
      name: 'Dashboard', 
      href: '/dashboard', 
      icon: LayoutDashboard,
      description: 'Overview & stats',
    },
    { 
      name: 'Assets', 
      href: '/assets', 
      icon: Package,
      description: 'View all assets',
    },
    { 
      name: 'Add Asset', 
      href: '/assets/new', 
      icon: PlusCircle,
      description: 'Create new asset',
    },
    { 
      name: 'Settings', 
      href: '/settings', 
      icon: Settings,
      description: 'App settings',
    },
  ];

  const isActive = (path) => {
    if (path === '/dashboard') {
      return location.pathname === path;
    }
    return location.pathname.startsWith(path);
  };

  return (
    <>
      {/* Mobile Backdrop */}
      {isOpen && (
        <div
          className="
            fixed inset-0 bg-black/50 backdrop-blur-sm
            z-40 lg:hidden
            animate-in fade-in duration-200
          "
          onClick={onClose}
          aria-hidden="true"
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
          fixed top-0 left-0 z-50 h-full
          w-72
          bg-white border-r-2 border-gray-100
          transform transition-transform duration-300 ease-out
          lg:translate-x-0 lg:static lg:z-0
          ${isOpen ? 'translate-x-0' : '-translate-x-full'}
          flex flex-col
          shadow-lg lg:shadow-none
        `}
      >
        {/* Sidebar Header - Mobile Only */}
        <div className="flex items-center justify-between h-16 px-6 border-b-2 border-gray-100 lg:hidden">
          <div className="flex items-center gap-3">
            <div className="
              h-10 w-10 
              bg-gradient-to-br from-blue-600 to-blue-700
              rounded-xl 
              flex items-center justify-center
              shadow-md
            ">
              <span className="text-white font-bold text-xl">F</span>
            </div>
            <div>
              <span className="text-xl font-bold text-gray-900">FleetFlow</span>
              <p className="text-xs text-gray-500 -mt-1">Asset Management</p>
            </div>
          </div>
          
          <button
            onClick={onClose}
            className="
              p-2 rounded-lg
              text-gray-600 hover:text-gray-900 hover:bg-gray-100
              transition-colors duration-200
              focus:outline-none focus:ring-2 focus:ring-blue-500
            "
            aria-label="Close menu"
          >
            <X size={24} />
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-4 py-6 overflow-y-auto">
          <ul className="space-y-1">
            {navigation.map((item) => {
              const Icon = item.icon;
              const active = isActive(item.href);
              
              return (
                <li key={item.name}>
                  <Link
                    to={item.href}
                    onClick={onClose}
                    className={`
                      group
                      flex items-center gap-3
                      px-4 py-3 rounded-xl
                      font-semibold text-sm
                      transition-all duration-200
                      ${active 
                        ? 'bg-blue-50 text-blue-700 shadow-sm' 
                        : 'text-gray-700 hover:bg-gray-50 hover:text-gray-900'
                      }
                      focus:outline-none focus:ring-2 focus:ring-blue-500
                    `}
                    aria-current={active ? 'page' : undefined}
                  >
                    <Icon 
                      size={20} 
                      className={`
                        flex-shrink-0
                        ${active ? 'text-blue-600' : 'text-gray-400 group-hover:text-gray-600'}
                        transition-colors duration-200
                      `}
                    />
                    
                    <div className="flex-1 min-w-0">
                      <p className="truncate">{item.name}</p>
                      {!active && (
                        <p className="text-xs text-gray-500 truncate mt-0.5">
                          {item.description}
                        </p>
                      )}
                    </div>

                    {/* Active Indicator */}
                    {active && (
                      <div className="
                        w-1 h-6 
                        bg-blue-600 rounded-full
                        animate-in slide-in-from-left duration-200
                      " />
                    )}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* Help Section */}
        <div className="p-4 border-t-2 border-gray-100">
          <div className="
            bg-gradient-to-br from-blue-50 to-blue-100
            rounded-xl p-4
            border-2 border-blue-200
          ">
            <div className="flex items-start gap-3 mb-3">
              <HelpCircle size={20} className="text-blue-600 flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-sm font-bold text-blue-900">Need Help?</p>
                <p className="text-xs text-blue-700 mt-1 leading-relaxed">
                  Check our documentation or contact support for assistance.
                </p>
              </div>
            </div>
            <button className="
              w-full px-4 py-2
              bg-white hover:bg-blue-50
              text-blue-700 font-semibold text-sm
              rounded-lg
              border-2 border-blue-200
              transition-colors duration-200
              focus:outline-none focus:ring-2 focus:ring-blue-500
            ">
              View Docs
            </button>
          </div>
        </div>

        {/* Version Info */}
        <div className="px-6 py-3 border-t-2 border-gray-100">
          <p className="text-xs text-gray-500 text-center">
            FleetFlow v1.0.0
          </p>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;