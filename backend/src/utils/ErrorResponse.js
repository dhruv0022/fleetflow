/**
 * Custom Error class for API responses
 * Makes it easier to send error messages with status codes
 */
class ErrorResponse extends Error {
  constructor(message, statusCode) {
    super(message); // Call parent Error constructor
    this.statusCode = statusCode; // Add status code property
    
    // Maintains proper stack trace for debugging
    Error.captureStackTrace(this, this.constructor);
  }
}

module.exports = ErrorResponse;