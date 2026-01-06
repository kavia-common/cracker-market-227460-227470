const express = require('express');
const healthController = require('../controllers/health');

const router = express.Router();
// Health endpoint

/**
 * @swagger
 * /:\n *   get:
 *     summary: Health endpoint with database status
 *     description: Returns the health status of the service including database connection state
 *     tags:
 *       - Health
 *     responses:
 *       200:
 *         description: Service health check passed
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   enum: [ok, degraded]
 *                   example: ok
 *                   description: Overall service status
 *                 message:
 *                   type: string
 *                   example: Service is healthy
 *                   description: Human-readable status message
 *                 timestamp:
 *                   type: string
 *                   format: date-time
 *                   description: Current timestamp
 *                 environment:
 *                   type: string
 *                   example: development
 *                   description: Current environment
 *                 database:
 *                   type: object
 *                   properties:
 *                     connected:
 *                       type: boolean
 *                       example: true
 *                       description: Database connection status
 *                     state:
 *                       type: string
 *                       enum: [connected, disconnected, connecting, disconnecting, unknown]
 *                       example: connected
 *                       description: Current database connection state
 */
router.get('/', healthController.check.bind(healthController));

module.exports = router;
