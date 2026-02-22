const jwt = require('jsonwebtoken');
const User = require('../models/User');
const ErrorResponse = require('../utils/ErrorResponse');

/**
 * Protect routes - verify JWT token
 * This runs BEFORE the actual route handler
 * It checks if user is logged in
 */
const protect = async (req, res, next) => {
  let token;

  // Check if token exists in Authorization header
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    // Extract token from "Bearer <token>"
    token = req.headers.authorization.split(' ')[1];
  }

  // If no token found, user is not logged in
  if (!token) {
    return next(new ErrorResponse('Not authorized to access this route', 401));
  }

  try {
    // Verify token is valid and not expired
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Get user from token and attach to request
    req.user = await User.findById(decoded.id).select('-password');

    if (!req.user) {
      return next(new ErrorResponse('User not found', 404));
    }

    // IMPORTANT: Add this line to ensure req.user.id exists
    req.user.id = req.user._id.toString();

    // Token is valid, continue to next middleware/route handler
    next();
  } catch (error) {
    return next(new ErrorResponse('Not authorized to access this route', 401));
  }
};
/**
 * Grant access to specific roles (admin, user, etc.)
 * Use after protect middleware
 */
const authorize = (...roles) => {
  return (req, res, next) => {
    // Check if user's role is in the allowed roles
    if (!roles.includes(req.user.role)) {
      return next(
        new ErrorResponse(
          `User role '${req.user.role}' is not authorized to access this route`,
          403
        )
      );
    }
    next();
  };
};

module.exports = { protect, authorize };