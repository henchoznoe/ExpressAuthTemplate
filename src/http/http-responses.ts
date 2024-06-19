import { Response } from "express";

type ResponseType = {
  success: boolean;
  message: string;
  data?: any;
}

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