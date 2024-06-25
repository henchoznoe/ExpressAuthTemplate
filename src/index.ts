import express, { Application, Request, Response, NextFunction } from 'express';
import 'dotenv/config';
import cors from 'cors';
import { logger, setupLogger } from "@lib/logger";
import { setupSwagger } from "@lib/swagger";
import { errorResponse } from "@http/responses";
import { authRoutes } from "@routes/authRoutes";
import { usersRoutes } from "@routes/usersRoutes";
import { rolesRoutes } from "@routes/rolesRoutes";

const app: Application = express();

// CORS
app.use(cors({
  origin: process.env.CORS_ORIGIN,
  methods: process.env.CORS_METHODS,
  allowedHeaders: process.env.CORS_HEADERS,
}));

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
app.use((req: Request, res: Response) => {
  errorResponse(res, 404, `The route you are looking for [${req.path}] does not exist...`);
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
