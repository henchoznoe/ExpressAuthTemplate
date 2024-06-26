import express from 'express';
import { authorizeAccess } from "@src/middlewares/routesAuthorization";
import { validateEmail, validatePassword, validateRoleId } from "@src/validator/authSchema";
import { allUsers, addUser, updateUser, deleteUser } from "@src/controllers/usersCtrl";
import { Role } from "@type/auth";
import { fieldsValidation } from "@src/middlewares/fieldsValidation";

export const usersRoutes = express.Router();

/**
 * @swagger
 * /api/users/all:
 *   get:
 *     summary: Retrieve all users
 *     tags: [Users]
 *     responses:
 *       200:
 *         description: List of users
 *       500:
 *         description: Server error
 */
usersRoutes.get(
  '/all',
  authorizeAccess([Role.SUPER_ADMIN]),
  allUsers
);

/**
 * @swagger
 * /api/users/add:
 *   post:
 *     summary: Add a new user
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *               roleId:
 *                 type: number
 *     responses:
 *       200:
 *         description: User added successfully
 *       400:
 *         description: Invalid input
 */
usersRoutes.post(
  '/add',
  [validateEmail, validatePassword, validateRoleId],
  fieldsValidation,
  authorizeAccess([Role.ADMIN, Role.SUPER_ADMIN]),
  addUser
);

/**
 * @swagger
 * /api/users/update/{id}:
 *   patch:
 *     summary: Update a user
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *               roleId:
 *                 type: number
 *     responses:
 *       200:
 *         description: User updated successfully
 *       400:
 *         description: Invalid input
 */
usersRoutes.patch(
  '/update/:id',
  [validateEmail, validatePassword, validateRoleId],
  fieldsValidation,
  authorizeAccess([Role.SUPER_ADMIN]),
  updateUser
);

/**
 * @swagger
 * /api/users/delete/{id}:
 *   delete:
 *     summary: Delete a user
 *     tags: [Users]
 *     responses:
 *       200:
 *         description: User deleted successfully
 *       400:
 *         description: Invalid input
 */
usersRoutes.delete(
  '/delete/:id',
  authorizeAccess([Role.SUPER_ADMIN]),
  deleteUser
);
