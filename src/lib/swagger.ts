import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import { Application } from "express";

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Express Auth Template API',
      version: '1.0.0',
      description: 'A simple Express API',
    },
  },
  apis: ['./src/routes/*.ts'],
};

const swaggerSpec = swaggerJSDoc(options);

export const setupSwagger = (app: Application) => {
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
};
