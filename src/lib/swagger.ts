import { app } from "../index";
import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Node Auth API',
      version: '1.0.0',
      description: 'A simple Express API',
    },
  },
  apis: ['./src/routes/*.ts'],
};

const swaggerSpec = swaggerJSDoc(options);

export const setupSwagger = () => {
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
};