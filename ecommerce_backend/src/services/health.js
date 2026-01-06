const { getConnectionStatus } = require('../db/connection');

class HealthService {
  // PUBLIC_INTERFACE
  /**
   * Get the health status of the service including database connection
   * @returns {Object} Health status object with service and database status
   */
  getStatus() {
    const dbStatus = getConnectionStatus();
    
    return {
      status: dbStatus.isConnected ? 'ok' : 'degraded',
      message: dbStatus.isConnected ? 'Service is healthy' : 'Service running but database disconnected',
      timestamp: new Date().toISOString(),
      environment: process.env.NODE_ENV || 'development',
      database: {
        connected: dbStatus.isConnected,
        state: dbStatus.state
      }
    };
  }
}
  
module.exports = new HealthService();
