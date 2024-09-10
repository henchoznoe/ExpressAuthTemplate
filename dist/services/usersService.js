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
exports.deleteUserById = exports.updateUserById = exports.addNewUser = exports.getAllUsers = void 0;
const prisma_1 = require("../lib/prisma");
const error_1 = require("../http/error");
const bcrypt_1 = require("bcrypt");
const getAllUsers = () => __awaiter(void 0, void 0, void 0, function* () {
    return prisma_1.db.user.findMany({
        select: {
            id: true,
            email: true,
            createdAt: true,
            updatedAt: true,
            role: true
        }
    });
});
exports.getAllUsers = getAllUsers;
const addNewUser = (email, password, roleId) => __awaiter(void 0, void 0, void 0, function* () {
    const existingUser = yield prisma_1.db.user.findUnique({
        where: {
            email
        }
    });
    if (existingUser)
        throw new error_1.HttpError(409, `User with email ${email} already exists`);
    const existingRole = yield prisma_1.db.role.findUnique({
        where: {
            id: roleId
        }
    });
    if (!existingRole)
        throw new error_1.HttpError(404, `Role with id ${roleId} does not exist`);
    const hashedPassword = yield (0, bcrypt_1.hash)(password, 10);
    const user = yield prisma_1.db.user.create({
        data: {
            email,
            password: hashedPassword,
            roleId
        }
    });
    const { password: newUserPassword } = user, newUser = __rest(user, ["password"]);
    return newUser;
});
exports.addNewUser = addNewUser;
const updateUserById = (id, email, password, roleId) => __awaiter(void 0, void 0, void 0, function* () {
    const existingUser = yield prisma_1.db.user.findUnique({
        where: {
            id
        }
    });
    if (!existingUser)
        throw new error_1.HttpError(404, `User with id ${id} does not exist`);
    const existingRole = yield prisma_1.db.role.findUnique({
        where: {
            id: roleId
        }
    });
    if (!existingRole)
        throw new error_1.HttpError(404, `Role with id ${roleId} does not exist`);
    const hashedPassword = yield (0, bcrypt_1.hash)(password, 10);
    const user = yield prisma_1.db.user.update({
        where: {
            id
        },
        data: {
            email,
            password: hashedPassword,
            roleId
        }
    });
    const { password: updatedUserPassword } = user, updatedUser = __rest(user, ["password"]);
    return updatedUser;
});
exports.updateUserById = updateUserById;
const deleteUserById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield prisma_1.db.user.findUnique({
        where: {
            id
        }
    });
    if (!user)
        throw new error_1.HttpError(404, `User with id ${id} does not exist`);
    yield prisma_1.db.user.delete({
        where: {
            id
        }
    });
    const { password: deletedUserPassword } = user, deletedUser = __rest(user, ["password"]);
    return deletedUser;
});
exports.deleteUserById = deleteUserById;
//# sourceMappingURL=usersService.js.map