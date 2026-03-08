const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const morgan = require('morgan');
const connectDB = require('./config/db');
const errorHandler = require('./middleware/errorMiddleware');

// Load environment variables from .env file
dotenv.config();

// Connect to MongoDB database
connectDB();

// Initialize Express app
const app = express();

// MIDDLEWARE

// Body parser - allows us to read JSON from requests
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// CORS - allows frontend to talk to backend
app.use(
  cors({
    origin: process.env.CLIENT_URL || 'http://localhost:5173',
    credentials: true,
  })
);

// Morgan - logs HTTP requests (only in development)
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

// API ROUTES

// Authentication routes - /api/auth/...
app.use('/api/auth', require('./routes/authRoutes'));

// Asset routes - /api/assets/...
app.use('/api/assets', require('./routes/assetRoutes'));

// HEALTH CHECK ROUTE
// Useful to test if server is running
app.get('/api/health', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'FleetFlow API is running',
    environment: process.env.NODE_ENV,
    timestamp: new Date().toISOString(),
  });
});

// ROOT ROUTE
// Shows basic API info
app.get('/', (req, res) => {
  res.json({
    message: 'FleetFlow API',
    version: '1.0.0',
    endpoints: {
      health: '/api/health',
      auth: '/api/auth',
      assets: '/api/assets',
    },
  });
});

// 404 HANDLER
// Catches all routes that don't exist
app.use((req, res, next) => {
  res.status(404).json({
    success: false,
    error: 'Route not found',
  });
});

// ERROR HANDLER MIDDLEWARE (must be last!)
app.use(errorHandler);

// START SERVER
const PORT = process.env.PORT || 5000;

const server = app.listen(PORT, () => {
  console.log(`
  ┌─────────────────────────────────────────┐
  │  🚀 FleetFlow API Server                │
  │  ✅ Server running on port ${PORT}       │
  │  📍 Mode: ${process.env.NODE_ENV || 'development'}               │
  │  🌐 URL: http://localhost:${PORT}        │
  │  📊 Health: http://localhost:${PORT}/api/health
  └─────────────────────────────────────────┘
  `);
});

// Handle unhandled promise rejections
process.on('unhandledRejection', (err) => {
  console.error(`❌ Unhandled Rejection: ${err.message}`);
  // Close server & exit process
  server.close(() => process.exit(1));
});

// Export app for testing
module.exports = app;