"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authRoutes = void 0;
const express_1 = __importDefault(require("express"));
const authSchema_1 = require("../validator/authSchema");
const fieldsValidation_1 = require("../middlewares/fieldsValidation");
const authCtrl_1 = require("../controllers/authCtrl");
exports.authRoutes = express_1.default.Router();
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
exports.authRoutes.post('/sign-up', [authSchema_1.validateEmail, authSchema_1.validatePassword], fieldsValidation_1.fieldsValidation, authCtrl_1.signUp);
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
exports.authRoutes.post('/sign-in', [authSchema_1.validateEmail, authSchema_1.validatePassword], fieldsValidation_1.fieldsValidation, authCtrl_1.signIn);
//# sourceMappingURL=authRoutes.js.map