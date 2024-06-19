import express from "express";
import { authorizeRouteAccess } from "../middleware/routes-authorization";
import { allRoles } from "../ctrl/roles";
import { Role } from "../types/auth";

export const router = express.Router();

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
router.get(
  '/all',
  authorizeRouteAccess([Role.ADMIN, Role.SUPER_ADMIN]),
  allRoles
);