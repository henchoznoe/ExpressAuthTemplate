import express from 'express';
import { handleValidationErrors, validateEmail, validatePassword } from "@src/validator/schemas";
import { signIn, signUp } from "@ctrls/authCtrl";

export const authRoutes = express.Router();

/**
 * @swagger
 * /api/auth/sign-up:
 *   post:
 *     summary: Sign up a new user
 *     tags: [Auth]
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
 *     responses:
 *       200:
 *         description: User signed up successfully
 *       400:
 *         description: Invalid input
 */
authRoutes.post(
  '/sign-up',
  [validateEmail, validatePassword],
  handleValidationErrors,
  signUp
);


/**
 * @swagger
 * /api/auth/sign-in:
 *   post:
 *     summary: Sign in a user
 *     tags: [Auth]
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
 *     responses:
 *       200:
 *         description: User signed in successfully
 *       400:
 *         description: Invalid input
 */
authRoutes.post(
  '/sign-in',
  [validateEmail, validatePassword],
  handleValidationErrors,
  signIn
);
