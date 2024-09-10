import { NextFunction, Request, Response } from "express";
import { errorResponse } from "../http/responses";

export const globalErrorHandler = (err: Error, req: Request, res: Response, next: NextFunction) => {
  const message = err.message || 'An unknown error occurred...';
  errorResponse(res, 500, message);
}
