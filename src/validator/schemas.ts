import { check, validationResult } from "express-validator";
import { NextFunction, Request, Response } from "express";
import { errorResponse } from "@http/responses";

export const handleValidationErrors = (req: Request, res: Response, next: NextFunction) => {
  const errors = validationResult(req);
  if ( !errors.isEmpty() ) return errorResponse(res, 400, errors.array()[0].msg);
  next();
};

export const validateEmail =
  check('email')
    .notEmpty()
    .withMessage('Email cannot be empty.')
    .isEmail()
    .normalizeEmail()
    .withMessage('Bad email format.');

export const validatePassword =
  check('password')
    .isString()
    .notEmpty()
    .withMessage('Password cannot be empty.')
    .isLength({ min: 8 })
    .withMessage('Password must be at least 8 characters long.')
    .matches(/[A-Z]/)
    .withMessage('Password must contain at least one uppercase letter.')
    .matches(/[a-z]/)
    .withMessage('Password must contain at least one lowercase letter.')
    .matches(/[0-9]/)
    .withMessage('Password must contain at least one digit.')
    .matches(/[\W_]/)
    .withMessage('Password must contain at least one special character.');

export const validateRoleId =
  check('roleId')
    .isNumeric()
    .withMessage('Bad roleID format.');
