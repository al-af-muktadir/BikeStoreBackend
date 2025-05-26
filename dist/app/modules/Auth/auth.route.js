"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthRouter = void 0;
const express_1 = __importDefault(require("express"));
const ValidateRequest_1 = __importDefault(require("../../middlewares/ValidateRequest"));
const userValidation_1 = require("../User/userValidation");
const auth_controller_1 = require("./auth.controller");
const auth_1 = require("../../middlewares/auth");
const route = express_1.default.Router();
route.post('/auth/register', (0, ValidateRequest_1.default)(userValidation_1.userValidation.userValidationSchema), auth_controller_1.authController.createUser);
route.post('/auth/login', (0, ValidateRequest_1.default)(userValidation_1.userLoginValidation), auth_controller_1.authController.loginUser);
route.post('/auth/refreshToken', 
// validateRequest(refreshTokenValidation),
auth_controller_1.authController.refreshToken);
route.patch('/auth/:email', (0, auth_1.auth)('customer'), (0, ValidateRequest_1.default)(userValidation_1.updateValidation), auth_controller_1.authController.updatePassword);
route.post('/auth/logout', auth_controller_1.authController.logOut);
route.get('/auth/:email', (0, auth_1.auth)('admin', 'customer'), auth_controller_1.authController.GetUserByemail);
route.get('/auth/all', auth_controller_1.authController.GetUserAll);
exports.AuthRouter = { route };
