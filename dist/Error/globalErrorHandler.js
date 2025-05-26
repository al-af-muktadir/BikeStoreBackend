"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.globalErrorHandler = void 0;
const http_status_codes_1 = require("http-status-codes");
const mongoose_1 = __importDefault(require("mongoose"));
const zod_1 = require("zod");
const handleZodError_1 = require("./handleZodError");
const AppError_1 = require("./AppError");
const globalErrorHandler = (err, req, res, 
// eslint-disable-next-line no-unused-vars
_next) => {
    let statusCode = 400;
    let message = 'something Went Wrong';
    let error = [
        {
            path: '',
            message: 'Somethinng Went Wrong',
        },
    ];
    if (err instanceof mongoose_1.default.Error.ValidationError) {
        res.send({
            success: false,
            statusCode: http_status_codes_1.StatusCodes.BAD_REQUEST,
            message: err.message,
            error: err.errors.name.name,
        });
    }
    else if (err instanceof zod_1.ZodError) {
        const SimplifiedError = (0, handleZodError_1.handleZodError)(err);
        statusCode = SimplifiedError.statusCode;
        message = SimplifiedError.message;
        error = SimplifiedError.error;
        res.send({
            success: false,
            statusCode,
            message,
            error,
        });
    }
    else if (err instanceof AppError_1.AppError) {
        statusCode = err === null || err === void 0 ? void 0 : err.statusCode;
        message = err.message;
        error = [
            {
                path: '',
                message: err === null || err === void 0 ? void 0 : err.message,
            },
        ];
        res.status(statusCode).json({
            success: false,
            statusCode: statusCode,
            message: message,
            error: error,
        });
    }
    else if (err instanceof Error) {
        res.status(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR).send({
            success: false,
            statusCode: http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR,
            message: message,
            error: error,
        });
    }
};
exports.globalErrorHandler = globalErrorHandler;
