"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
require("dotenv/config");
const cors_1 = require("./lib/cors");
const logger_1 = require("./lib/logger");
const swagger_1 = require("./lib/swagger");
const routes_1 = require("./lib/routes");
const logger_2 = require("./lib/logger");
const globalErrorHandler_1 = require("./middlewares/globalErrorHandler");
const app = (0, express_1.default)();
// JSON Parser
app.use(express_1.default.json());
// CORS
(0, cors_1.setupCors)(app);
// Logger
(0, logger_1.setupLogger)(app);
// Swagger
(0, swagger_1.setupSwagger)(app);
// Routes
(0, routes_1.setupRoutes)(app);
// Centralized Error Handling Middleware
app.use(globalErrorHandler_1.globalErrorHandler);
// Start server
app.listen(process.env.SERVER_PORT, () => {
    logger_2.logger.info(`NODE_ENV=${process.env.NODE_ENV}`);
    logger_2.logger.info(`Server running : http://localhost:${process.env.SERVER_PORT}`);
    logger_2.logger.info(`Swagger running : http://localhost:${process.env.SERVER_PORT}/api-docs`);
    logger_2.logger.info('Server started !');
});
//# sourceMappingURL=index.js.map