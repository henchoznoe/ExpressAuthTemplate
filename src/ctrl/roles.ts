import { logger } from "../lib/logger";
import { errorResponse, successResponse } from "../http/http-responses";
import { Request, Response } from "express";
import { getAllRoles } from "../wrk/roles";

export const allRoles = async (_: Request, res: Response) => {
  try {
    const roles = await getAllRoles();
    logger.info('Roles retrieved successfully');
    return successResponse(res, 200, 'Users retrieved successfully', roles);
  } catch ( err ) {
    logger.error(err.message || "Server error");
    return errorResponse(res, err.statusCode || 500, err.message || 'Server error');
  }
}