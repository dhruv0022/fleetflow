const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

// Define what a User looks like in the database
const userSchema = new mongoose.Schema(
  {
    // Username - must be unique, required, 3-30 characters
    username: {
      type: String,
      required: [true, 'Please provide a username'],
      unique: true,
      trim: true, // Remove spaces from beginning/end
      minlength: [3, 'Username must be at least 3 characters'],
      maxlength: [30, 'Username cannot exceed 30 characters'],
    },
    
    // Email - must be unique, required, valid format
    email: {
      type: String,
      required: [true, 'Please provide an email'],
      unique: true,
      trim: true,
      lowercase: true, // Always store as lowercase
      match: [
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
        'Please provide a valid email',
      ],
    },
    
    // Password - required, at least 6 characters, never shown by default
    password: {
      type: String,
      required: [true, 'Please provide a password'],
      minlength: [6, 'Password must be at least 6 characters'],
      select: false, // Don't include password when getting user data
    },
    
    // Role - either 'user' or 'admin', default is 'user'
    role: {
      type: String,
      enum: ['user', 'admin'],
      default: 'user',
    },
  },
  {
    timestamps: true, // Automatically add createdAt and updatedAt fields
  }
);

// BEFORE saving a user, hash (encrypt) their password
userSchema.pre('save', async function (next) {
  // Only hash if password was modified
  if (!this.isModified('password')) {
    next();
  }

  // Generate salt and hash password
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

// Method to check if entered password matches hashed password
userSchema.methods.comparePassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

// Don't return password in JSON responses
userSchema.methods.toJSON = function () {
  const user = this.toObject();
  delete user.password;
  return user;
};

// Export the User model
module.exports = mongoose.model('User', userSchema);