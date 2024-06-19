import { NextFunction, Request, Response } from "express";
import { validationResult } from "express-validator";
import { errorResponse } from "../http/http-responses";

export const handleValidationErrors = (req: Request, res: Response, next: NextFunction) => {
  const errors = validationResult(req);
  if ( !errors.isEmpty() ) return errorResponse(res, 400, errors.array().map(error => error.msg).join(' '));
  next();
};