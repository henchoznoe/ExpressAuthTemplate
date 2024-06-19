import { Request, Response } from "express";
import { errorResponse } from "../http/http-responses";
import { logger } from "../lib/logger";
import { app } from "../index";
import { router as authRoutes } from "./auth";
import { router as usersRoutes } from "./users";
import { router as rolesRoutes } from "./roles";

export const setupRoutes = () => {
  app.use('/api/auth', authRoutes);
  app.use('/api/users', usersRoutes);
  app.use('/api/roles', rolesRoutes);
  app.use((_: Request, res: Response) => {
    errorResponse(res, 404, 'This route doesn\'t exist...');
  });
}
