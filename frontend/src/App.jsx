import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { AssetProvider } from './context/AssetContext';
import { ToastProvider } from './context/ToastContext';
import PrivateRoute from './components/auth/PrivateRoute';
import ToastContainer from './components/common/Toast';

// Pages
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import Assets from './pages/Assets';
import AddAsset from './pages/AddAsset';
import AssetDetail from './pages/AssetDetail';
import NotFound from './pages/NotFound';

/**
 * Main App Component
 * Sets up routing, context providers, and global components
 */
function App() {
  return (
    <Router>
      <AuthProvider>
        <AssetProvider>
          <ToastProvider>
            {/* Global Toast Notifications */}
            <ToastContainer />
            
            {/* Application Routes */}
            <Routes>
              {/* Public Routes - Auth Pages */}
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              
              {/* Protected Routes - Main App */}
              <Route
                path="/dashboard"
                element={
                  <PrivateRoute>
                    <Dashboard />
                  </PrivateRoute>
                }
              />
              
              <Route
                path="/assets"
                element={
                  <PrivateRoute>
                    <Assets />
                  </PrivateRoute>
                }
              />
              
              <Route
                path="/assets/new"
                element={
                  <PrivateRoute>
                    <AddAsset />
                  </PrivateRoute>
                }
              />
              
              <Route
                path="/assets/:id"
                element={
                  <PrivateRoute>
                    <AssetDetail />
                  </PrivateRoute>
                }
              />
              
              {/* Root Redirect */}
              <Route 
                path="/" 
                element={<Navigate to="/dashboard" replace />} 
              />
              
              {/* 404 Page - Catch all unmatched routes */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </ToastProvider>
        </AssetProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;