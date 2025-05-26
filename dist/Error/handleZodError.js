"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleZodError = void 0;
const handleZodError = (err) => {
    const error = err.issues.map((issue) => ({
        path: issue.path[issue.path.length - 1],
        message: issue.message,
    }));
    const statusCode = 400;
    return {
        statusCode,
        message: 'Zod Error',
        error,
    };
};
exports.handleZodError = handleZodError;
