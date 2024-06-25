import express, { Application, NextFunction, Request, Response } from 'express';
import 'dotenv/config';
import { logger, setupLogger } from "@lib/logger";
import { setupSwagger } from "@lib/swagger";
import { errorResponse } from "@http/responses";
import { authRoutes } from "@routes/authRoutes";
import { usersRoutes } from "@routes/usersRoutes";
import { rolesRoutes } from "@routes/rolesRoutes";

const app: Application = express();

// CORS
app.use((_: Request, res: Response, next: NextFunction) => {
  res.setHeader('Access-Control-Allow-Origin', process.env.CORS_ORIGIN);
  res.setHeader('Access-Control-Allow-Headers', process.env.CORS_HEADERS);
  res.setHeader('Access-Control-Allow-Methods', process.env.CORS_METHODS);
  next();
});

// JSON Parser
app.use(express.json());

// Logger
setupLogger(app);

// Swagger
setupSwagger(app);

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/users', usersRoutes);
app.use('/api/roles', rolesRoutes);
app.use((_: Request, res: Response) => {
  errorResponse(res, 404, 'This route doesn\'t exist...');
});

app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  errorResponse(res, err.code || 500, err.message || 'An unknown error occurred...')
});

app.listen(process.env.SERVER_PORT, () => {
  logger.info(`NODE_ENV=${process.env.NODE_ENV}`);
  logger.info(`Server running : http://localhost:${process.env.SERVER_PORT}`);
  logger.info(`Swagger running : http://localhost:${process.env.SERVER_PORT}/api-docs`);
  logger.info('Server started !');
});
