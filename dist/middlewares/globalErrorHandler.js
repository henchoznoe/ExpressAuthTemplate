"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.globalErrorHandler = void 0;
const responses_1 = require("../http/responses");
const globalErrorHandler = (err, req, res, next) => {
    const message = err.message || 'An unknown error occurred...';
    (0, responses_1.errorResponse)(res, 500, message);
};
exports.globalErrorHandler = globalErrorHandler;
//# sourceMappingURL=globalErrorHandler.js.map