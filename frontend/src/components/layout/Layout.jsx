import { useState } from 'react';
import Header from './Header';
import Sidebar from './Sidebar';

/**
 * Main Layout Component
 * Wraps all authenticated pages with Header + Sidebar
 * Handles responsive sidebar state
 */
const Layout = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <Header onMenuClick={() => setSidebarOpen(true)} />
      
      {/* Main Container */}
      <div className="flex">
        {/* Sidebar */}
        <Sidebar 
          isOpen={sidebarOpen} 
          onClose={() => setSidebarOpen(false)} 
        />
        
        {/* Main Content Area */}
        <main className="flex-1 w-full lg:ml-0">
          {/* Content Container with consistent padding */}
          <div className="
            max-w-7xl mx-auto
            px-4 sm:px-6 lg:px-8
            py-6 sm:py-8
          ">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
};

export default Layout;