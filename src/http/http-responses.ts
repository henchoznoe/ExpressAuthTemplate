import { NextFunction, Request, Response } from "express";
import { ResponseType } from "responses";
import { validationResult } from "express-validator";

const sendResponse = (res: Response, statusCode: number, success: boolean, message: string, data?: any): void => {
  let response: ResponseType = {
    success,
    message
  }
  if ( data ) response.data = data;
  res.status(statusCode).json(response);
}

export const successResponse = (res: Response, statusCode: number, message: string, data: any): void => {
  sendResponse(res, statusCode, true, message, data);
};

export const errorResponse = (res: Response, statusCode: number, message: string) => {
  sendResponse(res, statusCode, false, message);
};

export const handleValidationErrors = (req: Request, res: Response, next: NextFunction) => {
  const errors = validationResult(req);
  if ( !errors.isEmpty() ) return errorResponse(res, 400, errors.array().map(error => error.msg).join(' '));
  next();
};