const swaggerJSDoc = require('swagger-jsdoc');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Crackers E-Commerce API',
      version: '1.0.0',
      description: 'REST API for the crackers e-commerce platform, providing endpoints for products, categories, cart, orders, and authentication. Connects to MongoDB on port 5001.',
    },
    servers: [
      {
        url: 'http://localhost:3001',
        description: 'Development server'
      }
    ],
    tags: [
      {
        name: 'Health',
        description: 'Service health and status endpoints'
      },
      {
        name: 'Authentication',
        description: 'User authentication and authorization endpoints (JWT-based)'
      }
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
          description: 'Enter JWT token obtained from /auth/login or /auth/register'
        }
      }
    },
    security: []
  },
  apis: ['./src/routes/*.js'], // Path to the API docs
};

const swaggerSpec = swaggerJSDoc(options);
module.exports = swaggerSpec;
