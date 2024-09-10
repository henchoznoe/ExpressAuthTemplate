import { Application, Request, Response } from "express";
import { authRoutes } from "../routes/authRoutes";
import { usersRoutes } from "../routes/usersRoutes";
import { rolesRoutes } from "../routes/rolesRoutes";
import { errorResponse } from "../http/responses";

export const setupRoutes = (app: Application) => {
  app.use('/api/auth', authRoutes);
  app.use('/api/users', usersRoutes);
  app.use('/api/roles', rolesRoutes);

  // 404 Error for undefined routes
  app.use((req: Request, res: Response) => {
    errorResponse(res, 404, `The route you are looking for [${req.path}] does not exist...`);
  });
}
