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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authController = void 0;
const http_status_codes_1 = require("http-status-codes");
const CatchAsync_1 = __importDefault(require("../../../util/CatchAsync"));
const sendResponse_1 = __importDefault(require("../../../util/sendResponse"));
const auth_service_1 = require("./auth.service");
// import { NextFunction } from 'express';
// import { userModel } from '../User/user.model';
const config_1 = __importDefault(require("../../config"));
const AppError_1 = require("../../../Error/AppError");
const createUser = (0, CatchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = req.body;
    const result = yield auth_service_1.authService.createUserIntoDb(user);
    const { refreshToken } = result;
    res.cookie('refreshToken', refreshToken, {
        secure: config_1.default.node_env === 'production',
        httpOnly: true,
    });
    (0, sendResponse_1.default)(res, {
        message: 'User Created Succesfully',
        statusCode: http_status_codes_1.StatusCodes.OK,
        data: result.token,
    });
}));
const loginUser = (0, CatchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield auth_service_1.authService.logInUserFromDb(req.body);
    const { refreshToken } = result;
    res.cookie('refreshToken', refreshToken, {
        secure: config_1.default.node_env === 'production',
        httpOnly: true,
    });
    res.status(http_status_codes_1.StatusCodes.OK).send({
        success: true,
        StatusCode: http_status_codes_1.StatusCodes.OK,
        message: 'User Logged in Succesfully',
        data: result.token,
    });
}));
const logOut = (0, CatchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const refreshToken = req.cookies.refreshToken;
    if (!refreshToken) {
        throw new AppError_1.AppError(http_status_codes_1.StatusCodes.NOT_FOUND, 'Refresh TOken Not FOund');
    }
    res.clearCookie('refreshToken', { httpOnly: true, secure: true });
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_codes_1.StatusCodes.OK,
        message: 'LoggedOut',
        data: [],
    });
}));
const refreshToken = (0, CatchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield auth_service_1.authService.sendrefreshToken(req.cookies.refreshToken);
    res.status(http_status_codes_1.StatusCodes.OK).send({
        success: true,
        StatusCode: http_status_codes_1.StatusCodes.OK,
        message: 'Token retrieevd in Succesfully',
        data: result,
    });
}));
const updatePassword = (0, CatchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield auth_service_1.authService.updatePassfromDb(req.params.email, req.body.OldPass, req.body.password);
    // ////console.log(result);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_codes_1.StatusCodes.OK,
        message: 'Password Changed Succesfully',
        data: result,
    });
}));
const GetUserByemail = (0, CatchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield auth_service_1.authService.getUserFromDb(req.params.email);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_codes_1.StatusCodes.OK,
        message: 'User Retireved Succesfully',
        data: result,
    });
}));
const GetUserAll = (0, CatchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield auth_service_1.authService.getAllUserFromDb();
    console.log(result);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_codes_1.StatusCodes.OK,
        message: 'All User Retireved Succesfully',
        data: result,
    });
}));
exports.authController = {
    createUser,
    loginUser,
    refreshToken,
    updatePassword,
    GetUserByemail,
    logOut,
    GetUserAll,
};
