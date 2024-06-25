import express from 'express';
import { check } from "express-validator";
import { handleValidationErrors } from "../middleware/fields-validation";
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
  [
    check('email').isEmail().withMessage('Bad email format.'),
    check('password').notEmpty().escape().withMessage('Bad password format.')
  ],
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
  [
    check('email').isEmail().withMessage('Bad email format.'),
    check('password').notEmpty().escape().withMessage('Bad password format.')
  ],
  handleValidationErrors,
  signIn
);
