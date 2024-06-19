import { errorResponse, successResponse } from "../http/http-responses";
import { Request, Response } from "express";
import { authenticateUser, createUser } from "../wrk/auth";
import { logger } from "../lib/logger";

export const signUp = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    const newUser = await createUser(email, password);
    logger.info(`User ${newUser.email} created successfully`);
    return successResponse(res, 201, 'User created successfully', newUser);
  } catch ( err ) {
    logger.error(err.message || "Server error");
    return errorResponse(res, err.statusCode || 500, err.message || 'Server error');
  }
}

export const signIn = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    const user = await authenticateUser(email, password);
    logger.info(`User ${user.email} is authenticated`)
    return successResponse(res, 200, 'User authenticated successfully', user);
  } catch ( err ) {
    logger.error(err.message || 'Server error')
    return errorResponse(res, err.statusCode || 500, err.message || 'Server error');
  }
}