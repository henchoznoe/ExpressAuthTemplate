import { Request, Response } from "express";
import { errorResponse, successResponse } from "@http/responses";
import { getAllRoles } from "@services/rolesService";

export const allRoles = async (_: Request, res: Response) => {
  try {
    const roles = await getAllRoles();
    return successResponse(res, 200, 'Users retrieved successfully', roles);
  } catch ( err ) {
    return errorResponse(res, err.statusCode || 500, err.message || 'Server error');
  }
}
