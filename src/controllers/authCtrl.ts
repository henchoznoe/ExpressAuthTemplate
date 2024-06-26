import { Request, Response } from "express";
import { errorResponse, successResponse } from "@http/responses";
import { authenticateUser, createUser } from "@services/authService";

export const signUp = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    const newUser = await createUser(email, password);
    return successResponse(res, 201, `User ${newUser.email} created successfully`, newUser);
  } catch ( err ) {
    return errorResponse(res, err.statusCode || 500, err.message || 'Server error');
  }
}

export const signIn = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    const user = await authenticateUser(email, password);
    return successResponse(res, 200, `User ${user.email} is authenticated`, user);
  } catch ( err ) {
    return errorResponse(res, err.statusCode || 500, err.message || 'Server error');
  }
}
