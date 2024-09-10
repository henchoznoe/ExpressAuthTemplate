"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authorizeAccess = void 0;
const responses_1 = require("../http/responses");
const jsonwebtoken_1 = require("jsonwebtoken");
const authorizeAccess = (roles = []) => {
    return (req, res, next) => {
        const authHeader = req.headers.authorization;
        if (!authHeader)
            return (0, responses_1.errorResponse)(res, 401, 'No token provided');
        const token = authHeader.split(' ')[1];
        const options = {
            issuer: process.env.JWT_ISSUER,
            audience: process.env.JWT_AUDIENCE,
        };
        (0, jsonwebtoken_1.verify)(token, process.env.JWT_SECRET, options, (err, user) => {
            if (err instanceof jsonwebtoken_1.TokenExpiredError)
                return (0, responses_1.errorResponse)(res, 401, 'Token has expired');
            if (err instanceof jsonwebtoken_1.NotBeforeError)
                return (0, responses_1.errorResponse)(res, 401, 'Token is not valid yet');
            if (err instanceof jsonwebtoken_1.JsonWebTokenError)
                return (0, responses_1.errorResponse)(res, 401, err.message);
            if (!roles.includes(user.roleId))
                return (0, responses_1.errorResponse)(res, 403, 'Access denied');
            next();
        });
    };
};
exports.authorizeAccess = authorizeAccess;
//# sourceMappingURL=routesAuthorization.js.map