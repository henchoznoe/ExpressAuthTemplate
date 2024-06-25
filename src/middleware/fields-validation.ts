import { NextFunction, Request, Response } from "express";
import { errorResponse } from "@http/responses";
import { validationResult } from "express-validator";

export const handleValidationErrors = (req: Request, res: Response, next: NextFunction) => {
  const errors = validationResult(req);
  if ( !errors.isEmpty() ) return errorResponse(res, 400, errors.array().map(error => error.msg).join(' '));
  next();
};
