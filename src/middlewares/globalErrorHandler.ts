import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import { NextFunction, Request, Response } from "express";
import { errorResponse } from "@http/responses";

export const globalErrorHandler = (err: PrismaClientKnownRequestError | Error, req: Request, res: Response, next: NextFunction) => {
  const statusCode = 'code' in err ? parseInt(err.code) : 500;
  const message = err.message || 'An unknown error occurred...';
  errorResponse(res, statusCode, message);
}
