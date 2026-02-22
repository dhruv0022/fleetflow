const express = require('express');
const {
  register,
  login,
  getMe,
  updateProfile,
  updatePassword,
} = require('../controllers/authController');
const { protect } = require('../middleware/authMiddleware');

// Create router
const router = express.Router();

// PUBLIC ROUTES (anyone can access)
router.post('/register', register);
router.post('/login', login);

// PROTECTED ROUTES (must be logged in)
router.get('/me', protect, getMe);
router.put('/profile', protect, updateProfile);
router.put('/password', protect, updatePassword);

// Export router
module.exports = router;