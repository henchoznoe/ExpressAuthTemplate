import express, { Request, Response, NextFunction, Application } from 'express';
import { setupCORS, setupParser } from "./lib/express";
import { setupLogger } from "./lib/logger";
import { setupSwagger } from "./lib/swagger";
import { setupRoutes } from "./routes/routes";
import 'dotenv/config';
import { errorResponse } from "./http/http-responses";
import { logger } from "./lib/logger";

const app: Application = express();

setupCORS(app);
setupParser(app);
setupLogger(app);
setupSwagger(app);
setupRoutes(app);

app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  logger.error(err.message || 'An unknown error occurred...');
  errorResponse(res, err.code || 500, err.message || 'An unknown error occurred...')
});

app.listen(process.env.SERVER_PORT, () => {
  logger.info(`NODE_ENV=${process.env.NODE_ENV}`);
  logger.info(`Server running : http://localhost:${process.env.SERVER_PORT}`);
  logger.info(`Swagger running : http://localhost:${process.env.SERVER_PORT}/api-docs`);
  logger.info('Server started');
});