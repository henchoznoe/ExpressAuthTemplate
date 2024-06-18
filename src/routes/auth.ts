import express from 'express';
import { check } from "express-validator";
import { handleValidationErrors } from "../http/http-responses";
import { signIn, signUp } from "../ctrl/auth";

const router = express.Router();

router.post(
  '/sign-up',
  [
    check('email').isEmail().withMessage('Bad email format.'),
    check('password').notEmpty().escape().withMessage('Bad password format.')
  ],
  handleValidationErrors,
  signUp
);

router.post(
  '/sign-in',
  [
    check('email').isEmail().withMessage('Bad email format.'),
    check('password').notEmpty().escape().withMessage('Bad password format.')
  ],
  handleValidationErrors,
  signIn
);

export default router;