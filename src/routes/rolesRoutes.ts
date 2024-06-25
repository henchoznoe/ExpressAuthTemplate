import express from "express";
import { authorizeRouteAccess } from "../middleware/routes-authorization";
import { allRoles } from "@ctrls/rolesCtrl";
import { Role } from "@type/auth";

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
  authorizeRouteAccess([Role.ADMIN, Role.SUPER_ADMIN]),
  allRoles
);
