import { Application, Request, Response } from "express";
import authRoutes from "./auth";
import { errorResponse } from "../http/http-responses";

export const setupRoutes = (app: Application) => {
  app.use('/api/auth', authRoutes);
  app.use((_: Request, res: Response) => {
    errorResponse(res, 404, 'This route doesn\'t exist...');
  });
}