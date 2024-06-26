import express, { Application } from 'express';
import 'dotenv/config';
import { setupCors } from "@lib/cors";
import { logger, setupLogger } from "@lib/logger";
import { setupSwagger } from "@lib/swagger";
import { globalErrorHandler } from "@src/middlewares/globalErrorHandler";
import { setupRoutes } from "@lib/routes";

const app: Application = express();

// JSON Parser
app.use(express.json());

// CORS
setupCors(app);

// Logger
setupLogger(app);

// Swagger
setupSwagger(app);

// Routes
setupRoutes(app);

// Centralized Error Handling Middleware
app.use(globalErrorHandler);

// Start server
app.listen(process.env.SERVER_PORT, () => {
  logger.info(`NODE_ENV=${process.env.NODE_ENV}`);
  logger.info(`Server running : http://localhost:${process.env.SERVER_PORT}`);
  logger.info(`Swagger running : http://localhost:${process.env.SERVER_PORT}/api-docs`);
  logger.info('Server started !');
});
