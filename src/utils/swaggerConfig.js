// swaggerConfig.js
export const swaggerOptions = {
    swaggerDefinition: {
      openapi: '3.0.0',
      info: {
        title: 'PORTFOLIO CONTACT API',
        version: '1.0.0',
        description: 'Portfolio  API Documentation',
      },
      servers: [
        {
          url: 'http://localhost:100/api/v1',
        },
        {
          url: 'https://contact-api-dmk4.onrender.com/api/v1',
        },
      ],
      
    },
    apis: ['./src/routes/*.js'],
  };
  