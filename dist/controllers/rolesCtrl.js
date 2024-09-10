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
exports.allRoles = void 0;
const rolesService_1 = require("../services/rolesService");
const responses_1 = require("../http/responses");
const allRoles = (_, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const roles = yield (0, rolesService_1.getAllRoles)();
        return (0, responses_1.successResponse)(res, 200, 'Users retrieved successfully', roles);
    }
    catch (err) {
        return (0, responses_1.errorResponse)(res, err.statusCode || 500, err.message || 'Server error');
    }
});
exports.allRoles = allRoles;
//# sourceMappingURL=rolesCtrl.js.map