"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.rolesRoutes = void 0;
const express_1 = __importDefault(require("express"));
const routesAuthorization_1 = require("../middlewares/routesAuthorization");
const auth_1 = require("../types/auth");
const rolesCtrl_1 = require("../controllers/rolesCtrl");
exports.rolesRoutes = express_1.default.Router();
/**
 * @swagger
 * /api/roles/all:
 *   get:
 *     summary: Retrieve all roles
 *     tags: [Roles]
 *     responses:
 *       200:
 *         description: List of roles
 *       500:
 *         description: Server error
 */
exports.rolesRoutes.get('/all', (0, routesAuthorization_1.authorizeAccess)([auth_1.Role.ADMIN, auth_1.Role.SUPER_ADMIN]), rolesCtrl_1.allRoles);
//# sourceMappingURL=rolesRoutes.js.map