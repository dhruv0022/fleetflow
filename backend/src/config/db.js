const mongoose = require('mongoose');

// Function to connect to MongoDB database
const connectDB = async () => {
  try {
    // Try to connect using the connection string from .env file
    const conn = await mongoose.connect(process.env.MONGO_URI);

    // If successful, show success message
    console.log(`✅ MongoDB Connected: ${conn.connection.host}`);
    console.log(`📊 Database: ${conn.connection.name}`);
  } catch (error) {
    // If it fails, show error and exit
    console.error(`❌ Error: ${error.message}`);
    process.exit(1); // Exit the program
  }
};

// Export so we can use it in server.js
module.exports = connectDB;