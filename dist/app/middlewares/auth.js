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
exports.auth = void 0;
const http_status_codes_1 = require("http-status-codes");
const AppError_1 = require("../../Error/AppError");
const CatchAsync_1 = __importDefault(require("../../util/CatchAsync"));
const auth_utils_1 = require("../modules/Auth/auth.utils");
const config_1 = __importDefault(require("../config"));
const user_model_1 = require("../modules/User/user.model");
const auth = (...authRoles) => {
    // //console.log(authRoles);
    return (0, CatchAsync_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        const Bearertoken = req.headers.authorization;
        const token = Bearertoken === null || Bearertoken === void 0 ? void 0 : Bearertoken.split(' ')[1];
        if (!token) {
            throw new AppError_1.AppError(http_status_codes_1.StatusCodes.UNAUTHORIZED, 'You are not Authorized');
        }
        let decoded;
        try {
            decoded = (0, auth_utils_1.VerifyToken)(token, config_1.default.access_token_secret);
        }
        catch (error) {
            throw new AppError_1.AppError(http_status_codes_1.StatusCodes.UNAUTHORIZED, `Not authorized' ${error}`);
        }
        const { email, role } = decoded;
        //console.log(email, role);
        const user = yield user_model_1.userModel.findOne({ email: email });
        if (!user) {
            throw new AppError_1.AppError(http_status_codes_1.StatusCodes.NOT_FOUND, 'User not Found');
        }
        if (role && !authRoles.includes(role)) {
            throw new AppError_1.AppError(http_status_codes_1.StatusCodes.UNAUTHORIZED, 'You are UnAuthorized');
        }
        req.user = {
            _id: user._id,
            email: user.email,
            role: user.role,
        };
        next();
    }));
};
exports.auth = auth;
