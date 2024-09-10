"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.usersRoutes = void 0;
const express_1 = __importDefault(require("express"));
const routesAuthorization_1 = require("../middlewares/routesAuthorization");
const auth_1 = require("../types/auth");
const usersCtrl_1 = require("../controllers/usersCtrl");
const authSchema_1 = require("../validator/authSchema");
const fieldsValidation_1 = require("../middlewares/fieldsValidation");
exports.usersRoutes = express_1.default.Router();
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
exports.usersRoutes.get('/all', (0, routesAuthorization_1.authorizeAccess)([auth_1.Role.SUPER_ADMIN]), usersCtrl_1.allUsers);
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
exports.usersRoutes.post('/add', [authSchema_1.validateEmail, authSchema_1.validatePassword, authSchema_1.validateRoleId], fieldsValidation_1.fieldsValidation, (0, routesAuthorization_1.authorizeAccess)([auth_1.Role.ADMIN, auth_1.Role.SUPER_ADMIN]), usersCtrl_1.addUser);
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
exports.usersRoutes.patch('/update/:id', [authSchema_1.validateEmail, authSchema_1.validatePassword, authSchema_1.validateRoleId], fieldsValidation_1.fieldsValidation, (0, routesAuthorization_1.authorizeAccess)([auth_1.Role.SUPER_ADMIN]), usersCtrl_1.updateUser);
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
exports.usersRoutes.delete('/delete/:id', (0, routesAuthorization_1.authorizeAccess)([auth_1.Role.SUPER_ADMIN]), usersCtrl_1.deleteUser);
//# sourceMappingURL=usersRoutes.js.map