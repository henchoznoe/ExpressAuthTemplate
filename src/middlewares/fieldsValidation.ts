import { NextFunction, Request, Response } from "express";
import { validationResult } from "express-validator";
import { errorResponse } from "../http/responses";

export const fieldsValidation = (req: Request, res: Response, next: NextFunction) => {
  const errors = validationResult(req);
  if ( !errors.isEmpty() ) return errorResponse(res, 400, errors.array()[0].msg);
  next();
};
