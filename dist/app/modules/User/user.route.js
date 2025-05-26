"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserRouter = void 0;
const express_1 = __importDefault(require("express"));
const user_controller_1 = require("./user.controller");
const auth_1 = require("../../middlewares/auth");
const route = express_1.default.Router();
route.get('/user', user_controller_1.userController.getUser);
route.get('/user/:id', user_controller_1.userController.getSpeceficUser);
route.patch('/user/:id', (0, auth_1.auth)('admin'), user_controller_1.userController.updateUser);
exports.UserRouter = route;
