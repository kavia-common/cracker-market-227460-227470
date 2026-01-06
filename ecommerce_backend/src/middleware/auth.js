const authService = require('../services/auth');

// PUBLIC_INTERFACE
/**
 * Middleware to authenticate JWT token
 * Extracts token from Authorization header and verifies it
 * Attaches user data to req.user
 */
async function authenticate(req, res, next) {
  try {
    // Get token from Authorization header
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({
        status: 'error',
        message: 'Authorization token required',
      });
    }

    const token = authHeader.substring(7); // Remove 'Bearer ' prefix

    // Verify token
    const decoded = authService.verifyToken(token);

    // Attach user data to request
    req.user = decoded;

    next();
  } catch (error) {
    console.error('Authentication error:', error);
    return res.status(401).json({
      status: 'error',
      message: 'Invalid or expired token',
    });
  }
}

// PUBLIC_INTERFACE
/**
 * Middleware to check if authenticated user has admin role
 * Must be used after authenticate middleware
 */
function isAdmin(req, res, next) {
  if (!req.user) {
    return res.status(401).json({
      status: 'error',
      message: 'Authentication required',
    });
  }

  if (req.user.role !== 'admin') {
    return res.status(403).json({
      status: 'error',
      message: 'Admin access required',
    });
  }

  next();
}

// PUBLIC_INTERFACE
/**
 * Optional authentication middleware
 * Attempts to authenticate but doesn't fail if token is missing
 * Useful for endpoints that have different behavior for authenticated users
 */
async function optionalAuthenticate(req, res, next) {
  try {
    const authHeader = req.headers.authorization;
    if (authHeader && authHeader.startsWith('Bearer ')) {
      const token = authHeader.substring(7);
      const decoded = authService.verifyToken(token);
      req.user = decoded;
    }
    next();
  } catch (error) {
    // Token invalid but continue anyway
    next();
  }
}

module.exports = {
  authenticate,
  isAdmin,
  optionalAuthenticate,
};
