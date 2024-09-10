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
exports.deleteUser = exports.updateUser = exports.addUser = exports.allUsers = void 0;
const usersService_1 = require("../services/usersService");
const responses_1 = require("../http/responses");
const allUsers = (_, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const users = yield (0, usersService_1.getAllUsers)();
        return (0, responses_1.successResponse)(res, 200, 'Users retrieved successfully', users);
    }
    catch (err) {
        return (0, responses_1.errorResponse)(res, err.statusCode || 500, err.message || 'Server error');
    }
});
exports.allUsers = allUsers;
const addUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password, roleId } = req.body;
        const newUser = yield (0, usersService_1.addNewUser)(email, password, parseInt(roleId));
        return (0, responses_1.successResponse)(res, 201, `User ${newUser.email} created successfully`, newUser);
    }
    catch (err) {
        return (0, responses_1.errorResponse)(res, err.statusCode || 500, err.message || 'Server error');
    }
});
exports.addUser = addUser;
const updateUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const { email, password, roleId } = req.body;
        const updatedUser = yield (0, usersService_1.updateUserById)(id, email, password, parseInt(roleId));
        return (0, responses_1.successResponse)(res, 200, `User with id ${id} updated successfully`, updatedUser);
    }
    catch (err) {
        return (0, responses_1.errorResponse)(res, err.statusCode || 500, err.message || 'Server error');
    }
});
exports.updateUser = updateUser;
const deleteUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const deletedUser = yield (0, usersService_1.deleteUserById)(id);
        return (0, responses_1.successResponse)(res, 200, `User with id ${id} deleted successfully`, deletedUser);
    }
    catch (err) {
        return (0, responses_1.errorResponse)(res, err.statusCode || 500, err.message || 'Server error');
    }
});
exports.deleteUser = deleteUser;
//# sourceMappingURL=usersCtrl.js.map