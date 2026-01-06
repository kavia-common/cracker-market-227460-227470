const mongoose = require('mongoose');

// MongoDB connection configuration from environment variables
const MONGODB_URL = process.env.MONGODB_URL;
const MONGODB_DB = process.env.MONGODB_DB || 'myapp';

// Construct full MongoDB URI
const MONGODB_URI = MONGODB_URL 
  ? `${MONGODB_URL.replace(/\/$/, '')}/${MONGODB_DB}${MONGODB_URL.includes('?') ? '&' : '?'}authSource=admin`
  : `mongodb://appuser:dbuser123@localhost:5001/${MONGODB_DB}?authSource=admin`;

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
 * @returns {Object} Connection status details
 */
// PUBLIC_INTERFACE
function getConnectionStatus() {
  const readyState = mongoose.connection.readyState;
  const states = {
    0: 'disconnected',
    1: 'connected',
    2: 'connecting',
    3: 'disconnecting'
  };
  
  return {
    isConnected: isConnected && readyState === 1,
    state: states[readyState] || 'unknown',
    readyState: readyState
  };
}

module.exports = {
  connectDB,
  closeDB,
  getConnectionStatus,
};
