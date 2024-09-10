import express from "express";
import { validateEmail, validatePassword } from "../validator/authSchema";
import { fieldsValidation } from "../middlewares/fieldsValidation";
import { signIn, signUp } from "../controllers/authCtrl";

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
  fieldsValidation,
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
  fieldsValidation,
  signIn
);
