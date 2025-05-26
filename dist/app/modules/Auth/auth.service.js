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
exports.authService = void 0;
const http_status_codes_1 = require("http-status-codes");
const user_model_1 = require("../User/user.model");
const bcrypt_1 = __importDefault(require("bcrypt"));
const AppError_1 = require("../../../Error/AppError");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = __importDefault(require("../../config"));
// import sendRespose from '../../../util/sendResponse';
const auth_utils_1 = require("./auth.utils");
const createUserIntoDb = (user) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield user_model_1.userModel.create(user);
    const token = jsonwebtoken_1.default.sign({
        email: result.email,
        role: result.role,
        name: result.name,
    }, config_1.default.access_token_secret, { expiresIn: '200d' });
    const refreshToken = jsonwebtoken_1.default.sign({
        email: user.email,
        role: user.role,
        name: result.name,
    }, config_1.default.refresh_token_secret, { expiresIn: '200d' });
    return { token, refreshToken, result };
});
const logInUserFromDb = (user) => __awaiter(void 0, void 0, void 0, function* () {
    const userData = yield user_model_1.userModel.findOne({ email: user.email });
    const isPasswordMatched = yield bcrypt_1.default.compare(user.password, userData === null || userData === void 0 ? void 0 : userData.password);
    if (!isPasswordMatched) {
        throw new AppError_1.AppError(http_status_codes_1.StatusCodes.UNAUTHORIZED, 'You are not Authorized');
    }
    else if (!userData) {
        throw new AppError_1.AppError(http_status_codes_1.StatusCodes.NOT_FOUND, 'User Not Found');
    }
    else if (userData.isBlocked === true) {
        throw new AppError_1.AppError(http_status_codes_1.StatusCodes.NOT_FOUND, 'User is Blocked');
    }
    else {
        const token = jsonwebtoken_1.default.sign({
            email: userData.email,
            role: userData.role,
            name: userData.name,
        }, config_1.default.access_token_secret, { expiresIn: '200d' });
        const refreshToken = jsonwebtoken_1.default.sign({
            email: userData.email,
            role: userData.role,
            name: userData.name,
        }, config_1.default.refresh_token_secret, { expiresIn: '200d' });
        return { token, refreshToken };
    }
});
const sendrefreshToken = (token) => __awaiter(void 0, void 0, void 0, function* () {
    if (!token) {
        throw new AppError_1.AppError(http_status_codes_1.StatusCodes.UNAUTHORIZED, 'You are not Authorized');
    }
    const decoded = (0, auth_utils_1.VerifyToken)(token, config_1.default.refresh_token_secret);
    const { email } = decoded;
    const user = yield user_model_1.userModel.findOne({ email: email });
    if (!user) {
        throw new AppError_1.AppError(http_status_codes_1.StatusCodes.NOT_FOUND, 'User not Found');
    }
    const accesstoken = jsonwebtoken_1.default.sign({
        email: user.email,
        role: user.role,
    }, config_1.default.access_token_secret, { expiresIn: '200d' });
    return {
        accesstoken,
    };
});
const updatePassfromDb = (email, OldPass, password) => __awaiter(void 0, void 0, void 0, function* () {
    // const decodedPass = await bcrypt.compare(password,)
    const result = yield user_model_1.userModel.findOne({ email: email });
    // ////console.log('Oold', OldPass);
    const decodedPass = yield bcrypt_1.default.compare(OldPass, result === null || result === void 0 ? void 0 : result.password);
    if (!decodedPass) {
        throw new AppError_1.AppError(http_status_codes_1.StatusCodes.BAD_REQUEST, 'PassWord Not MAtched');
    }
    const hashedPass = yield bcrypt_1.default.hash(password, 10);
    const result2 = yield user_model_1.userModel.updateOne({ email: email }, { $set: { password: hashedPass } });
    return result2;
});
const getUserFromDb = (email) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield user_model_1.userModel.findOne({ email: email });
    return result;
});
const getAllUserFromDb = () => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield user_model_1.userModel.find();
    console.log(result, 'result');
    return result;
});
exports.authService = {
    createUserIntoDb,
    logInUserFromDb,
    sendrefreshToken,
    updatePassfromDb,
    getUserFromDb,
    getAllUserFromDb,
};
