import { Response } from "express";
import { logger } from "../lib/logger";
import { ResponseType } from "../types/response";

// Send a success or error response to client
const sendResponse = (res: Response, statusCode: number, success: boolean, message: string, data?: any): void => {
  const response: ResponseType = { success, message, ...(data && { data }) };
  logger[success ? 'info' : 'error'](`Message : ${message}`);
  res.status(statusCode).json(response);
}

// Send success response to client
export const successResponse = (res: Response, statusCode: number, message: string, data: any): void => {
  sendResponse(res, statusCode, true, message, data);
};

// Send error response to client
export const errorResponse = (res: Response, statusCode: number, message: string) => {
  sendResponse(res, statusCode, false, message);
};
