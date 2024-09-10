import { Request, Response } from "express";
import { addNewUser, deleteUserById, getAllUsers, updateUserById } from "../services/usersService";
import { errorResponse, successResponse } from "../http/responses";

export const allUsers = async (_: Request, res: Response) => {
  try {
    const users = await getAllUsers();
    return successResponse(res, 200, 'Users retrieved successfully', users);
  } catch ( err ) {
    return errorResponse(res, err.statusCode || 500, err.message || 'Server error');
  }
}

export const addUser = async (req: Request, res: Response) => {
  try {
    const { email, password, roleId } = req.body;
    const newUser = await addNewUser(email, password, parseInt(roleId));
    return successResponse(res, 201, `User ${newUser.email} created successfully`, newUser);
  } catch ( err ) {
    return errorResponse(res, err.statusCode || 500, err.message || 'Server error');
  }
}

export const updateUser = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { email, password, roleId } = req.body;
    const updatedUser = await updateUserById(id, email, password, parseInt(roleId));
    return successResponse(res, 200, `User with id ${id} updated successfully`, updatedUser);
  } catch ( err ) {
    return errorResponse(res, err.statusCode || 500, err.message || 'Server error');
  }
}

export const deleteUser = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const deletedUser = await deleteUserById(id);
    return successResponse(res, 200, `User with id ${id} deleted successfully`, deletedUser);
  } catch ( err ) {
    return errorResponse(res, err.statusCode || 500, err.message || 'Server error');
  }
}
