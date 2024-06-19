import { Request, Response } from "express";
import { logger } from "../lib/logger";
import { errorResponse, successResponse } from "../http/http-responses";
import { addNewUser, deleteUserById, getAllUsers, updateUserById } from "../wrk/users";

export const allUsers = async (_: Request, res: Response) => {
  try {
    const users = await getAllUsers();
    logger.info('Users retrieved successfully');
    return successResponse(res, 200, 'Users retrieved successfully', users);
  } catch ( err ) {
    logger.error(err.message || "Server error");
    return errorResponse(res, err.statusCode || 500, err.message || 'Server error');
  }
}

export const addUser = async (req: Request, res: Response) => {
  try {
    const { email, password, roleId } = req.body;
    const newUser = await addNewUser(email, password, roleId);
    logger.info(`User ${newUser.email} created successfully`);
    return successResponse(res, 201, 'User created successfully', newUser);
  } catch ( err ) {
    logger.error(err.message || "Server error");
    return errorResponse(res, err.statusCode || 500, err.message || 'Server error');
  }
}

export const updateUser = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { email, password, roleId } = req.body;
    const updatedUser = await updateUserById(id, email, password, roleId);
    logger.info(`User with id ${id} updated successfully`);
    return successResponse(res, 200, 'User updated successfully', updatedUser);
  } catch ( err ) {
    logger.error(err.message || "Server error");
    return errorResponse(res, err.statusCode || 500, err.message || 'Server error');
  }
}

export const deleteUser = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const deletedUser = await deleteUserById(id);
    logger.info(`User with id ${id} deleted successfully`);
    return successResponse(res, 200, 'User deleted successfully', deletedUser);
  } catch ( err ) {
    logger.error(err.message || "Server error");
    return errorResponse(res, err.statusCode || 500, err.message || 'Server error');
  }
}