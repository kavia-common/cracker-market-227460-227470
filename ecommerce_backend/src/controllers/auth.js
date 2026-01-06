const authService = require('../services/auth');

class AuthController {
  // PUBLIC_INTERFACE
  /**
   * Register a new user
   * POST /auth/register
   */
  async register(req, res) {
    try {
      const { email, password, firstName, lastName, phone } = req.body;

      // Validate required fields
      if (!email || !password || !firstName || !lastName) {
        return res.status(400).json({
          status: 'error',
          message: 'Email, password, firstName, and lastName are required',
        });
      }

      const result = await authService.register({
        email,
        password,
        firstName,
        lastName,
        phone,
      });

      return res.status(201).json({
        status: 'success',
        message: 'User registered successfully',
        data: result,
      });
    } catch (error) {
      console.error('Registration error:', error);
      return res.status(400).json({
        status: 'error',
        message: error.message || 'Registration failed',
      });
    }
  }

  // PUBLIC_INTERFACE
  /**
   * Login user
   * POST /auth/login
   */
  async login(req, res) {
    try {
      const { email, password } = req.body;

      // Validate required fields
      if (!email || !password) {
        return res.status(400).json({
          status: 'error',
          message: 'Email and password are required',
        });
      }

      const result = await authService.login(email, password);

      return res.status(200).json({
        status: 'success',
        message: 'Login successful',
        data: result,
      });
    } catch (error) {
      console.error('Login error:', error);
      return res.status(401).json({
        status: 'error',
        message: error.message || 'Login failed',
      });
    }
  }

  // PUBLIC_INTERFACE
  /**
   * Get current user profile
   * GET /auth/me
   */
  async getProfile(req, res) {
    try {
      // User is attached to req by authenticate middleware
      const user = await authService.getUserProfile(req.user.id);

      return res.status(200).json({
        status: 'success',
        data: user,
      });
    } catch (error) {
      console.error('Get profile error:', error);
      return res.status(404).json({
        status: 'error',
        message: error.message || 'Failed to retrieve user profile',
      });
    }
  }
}

module.exports = new AuthController();
