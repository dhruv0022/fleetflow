const jwt = require('jsonwebtoken');

/**
 * Generate JWT token for user authentication
 * @param {string} userId - User's MongoDB _id
 * @returns {string} JWT token
 */
const generateToken = (userId) => {
  // Create token with user's ID
  // Token expires in 30 days
  // Uses secret from .env file
  return jwt.sign(
    { id: userId }, // Payload (data in token)
    process.env.JWT_SECRET, // Secret key
    {
      expiresIn: '30d', // Token expires in 30 days
    }
  );
};

module.exports = generateToken;