import express from "express";
import { authorizeAccess } from "../middlewares/routesAuthorization";
import { Role } from "../types/auth";
import { allRoles } from "../controllers/rolesCtrl";

export const rolesRoutes = express.Router();

/**
 * @swagger
 * /api/roles/all:
 *   get:
 *     summary: Retrieve all roles
 *     tags: [Roles]
 *     responses:
 *       200:
 *         description: List of roles
 *       500:
 *         description: Server error
 */
rolesRoutes.get(
  '/all',
  authorizeAccess([Role.ADMIN, Role.SUPER_ADMIN]),
  allRoles
);
