const mongoose = require('mongoose');

// MongoDB connection configuration
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://appuser:dbuser123@localhost:5001/myapp?authSource=admin';

let isConnected = false;

/**
 * Connect to MongoDB database
 * @returns {Promise<mongoose.Connection>} MongoDB connection
 */
// PUBLIC_INTERFACE
async function connectDB() {
  if (isConnected) {
    console.log('Using existing MongoDB connection');
    return mongoose.connection;
  }

  try {
    await mongoose.connect(MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    isConnected = true;
    console.log('MongoDB connected successfully to:', MONGODB_URI.replace(/\/\/.*:.*@/, '//***:***@'));
    
    mongoose.connection.on('error', (err) => {
      console.error('MongoDB connection error:', err);
      isConnected = false;
    });

    mongoose.connection.on('disconnected', () => {
      console.log('MongoDB disconnected');
      isConnected = false;
    });

    return mongoose.connection;
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
    isConnected = false;
    throw error;
  }
}

/**
 * Close MongoDB connection
 * @returns {Promise<void>}
 */
// PUBLIC_INTERFACE
async function closeDB() {
  if (!isConnected) {
    return;
  }

  try {
    await mongoose.connection.close();
    isConnected = false;
    console.log('MongoDB connection closed');
  } catch (error) {
    console.error('Error closing MongoDB connection:', error);
    throw error;
  }
}

/**
 * Get current connection status
 * @returns {boolean} Connection status
 */
// PUBLIC_INTERFACE
function getConnectionStatus() {
  return isConnected && mongoose.connection.readyState === 1;
}

module.exports = {
  connectDB,
  closeDB,
  getConnectionStatus,
};
