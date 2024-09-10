"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.fieldsValidation = void 0;
const express_validator_1 = require("express-validator");
const responses_1 = require("../http/responses");
const fieldsValidation = (req, res, next) => {
    const errors = (0, express_validator_1.validationResult)(req);
    if (!errors.isEmpty())
        return (0, responses_1.errorResponse)(res, 400, errors.array()[0].msg);
    next();
};
exports.fieldsValidation = fieldsValidation;
//# sourceMappingURL=fieldsValidation.js.map