"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.setupRoutes = void 0;
const authRoutes_1 = require("../routes/authRoutes");
const usersRoutes_1 = require("../routes/usersRoutes");
const rolesRoutes_1 = require("../routes/rolesRoutes");
const responses_1 = require("../http/responses");
const setupRoutes = (app) => {
    app.use('/api/auth', authRoutes_1.authRoutes);
    app.use('/api/users', usersRoutes_1.usersRoutes);
    app.use('/api/roles', rolesRoutes_1.rolesRoutes);
    // 404 Error for undefined routes
    app.use((req, res) => {
        (0, responses_1.errorResponse)(res, 404, `The route you are looking for [${req.path}] does not exist...`);
    });
};
exports.setupRoutes = setupRoutes;
//# sourceMappingURL=routes.js.map