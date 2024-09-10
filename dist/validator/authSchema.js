"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateRoleId = exports.validatePassword = exports.validateEmail = void 0;
const express_validator_1 = require("express-validator");
exports.validateEmail = (0, express_validator_1.check)('email')
    .notEmpty()
    .withMessage('Email cannot be empty.')
    .isEmail()
    .normalizeEmail()
    .withMessage('Bad email format.');
exports.validatePassword = (0, express_validator_1.check)('password')
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
exports.validateRoleId = (0, express_validator_1.check)('roleId')
    .isNumeric()
    .withMessage('Bad roleID format.');
//# sourceMappingURL=authSchema.js.map