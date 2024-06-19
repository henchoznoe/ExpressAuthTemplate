import express from 'express';
import { allUsers, addUser, updateUser, deleteUser } from "../ctrl/users";
import { authorizeRouteAccess } from "../middleware/routes-authorization";
import { check } from "express-validator";
import { handleValidationErrors } from "../middleware/fields-validation";
import { Role } from "../types/auth";

export const router = express.Router();

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
router.get('/all', authorizeRouteAccess([Role.SUPER_ADMIN]), allUsers);

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
router.post(
  '/add',
  [
    check('email').isEmail().withMessage('Bad email format.'),
    check('password').notEmpty().escape().withMessage('Bad password format.'),
    check('roleId').isNumeric().withMessage('Bad role format.'),
  ],
  handleValidationErrors,
  authorizeRouteAccess([Role.ADMIN, Role.SUPER_ADMIN]),
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
router.patch(
  '/update/:id',
  [
    check('email').isEmail().withMessage('Bad email format.'),
    check('password').notEmpty().escape().withMessage('Bad password format.'),
    check('roleId').isNumeric().withMessage('Bad role format.'),
  ],
  handleValidationErrors,
  authorizeRouteAccess([Role.SUPER_ADMIN]),
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
router.delete(
  '/delete/:id',
  authorizeRouteAccess([Role.SUPER_ADMIN]),
  deleteUser
);