"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.setupCors = void 0;
const cors_1 = __importDefault(require("cors"));
const setupCors = (app) => {
    app.use((0, cors_1.default)({
        origin: process.env.CORS_ORIGIN,
        methods: process.env.CORS_METHODS,
        allowedHeaders: process.env.CORS_HEADERS,
    }));
};
exports.setupCors = setupCors;
//# sourceMappingURL=cors.js.map