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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authenticateUser = exports.createUser = void 0;
const prisma_1 = require("../lib/prisma");
const error_1 = require("../http/error");
const bcrypt_1 = require("bcrypt");
const auth_1 = require("../types/auth");
const jsonwebtoken_1 = require("jsonwebtoken");
const createUser = (email, password) => __awaiter(void 0, void 0, void 0, function* () {
    const existingUser = yield prisma_1.db.user.findUnique({
        where: {
            email
        }
    });
    if (existingUser)
        throw new error_1.HttpError(409, `User with email ${email} already exists`);
    const hashedPassword = yield (0, bcrypt_1.hash)(password, 10);
    const user = yield prisma_1.db.user.create({
        data: {
            email,
            password: hashedPassword,
            roleId: auth_1.Role.USER
        }
    });
    const { password: newUserPassword } = user, newUser = __rest(user, ["password"]);
    return newUser;
});
exports.createUser = createUser;
const authenticateUser = (email, password) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield prisma_1.db.user.findUnique({
        where: {
            email
        }
    });
    if (!user || !(yield (0, bcrypt_1.compare)(password, user.password))) {
        throw new error_1.HttpError(401, `Invalid credentials for user ${email}`);
    }
    const token = generateToken(user);
    const { password: newUserPassword } = user, newUser = __rest(user, ["password"]);
    return Object.assign(Object.assign({}, newUser), { token });
});
exports.authenticateUser = authenticateUser;
const generateToken = (user) => {
    const payload = {
        id: user.id,
        email: user.email,
        roleId: user.roleId
    };
    return (0, jsonwebtoken_1.sign)(payload, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRES_IN,
        issuer: process.env.JWT_ISSUER,
        audience: process.env.JWT_AUDIENCE
    });
};
//# sourceMappingURL=authService.js.map