"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorResponse = exports.successResponse = void 0;
const logger_1 = require("../lib/logger");
// Send a success or error response to client
const sendResponse = (res, statusCode, success, message, data) => {
    const response = Object.assign({ success, message }, (data && { data }));
    logger_1.logger[success ? 'info' : 'error'](`Message : ${message}`);
    res.status(statusCode).json(response);
};
// Send success response to client
const successResponse = (res, statusCode, message, data) => {
    sendResponse(res, statusCode, true, message, data);
};
exports.successResponse = successResponse;
// Send error response to client
const errorResponse = (res, statusCode, message) => {
    sendResponse(res, statusCode, false, message);
};
exports.errorResponse = errorResponse;
//# sourceMappingURL=responses.js.map