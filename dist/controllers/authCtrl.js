"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.signIn = exports.signUp = void 0;
const responses_1 = require("../http/responses");
const authService_1 = require("../services/authService");
const signUp = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password } = req.body;
        const newUser = yield (0, authService_1.createUser)(email, password);
        return (0, responses_1.successResponse)(res, 201, `User ${newUser.email} created successfully`, newUser);
    }
    catch (err) {
        return (0, responses_1.errorResponse)(res, err.statusCode || 500, err.message || 'Server error');
    }
});
exports.signUp = signUp;
const signIn = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password } = req.body;
        const user = yield (0, authService_1.authenticateUser)(email, password);
        return (0, responses_1.successResponse)(res, 200, `User ${user.email} is authenticated`, user);
    }
    catch (err) {
        return (0, responses_1.errorResponse)(res, err.statusCode || 500, err.message || 'Server error');
    }
});
exports.signIn = signIn;
//# sourceMappingURL=authCtrl.js.map