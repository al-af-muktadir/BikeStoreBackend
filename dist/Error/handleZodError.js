"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleZodError = void 0;
const handleZodError = (err) => {
    var _a;
    const error = (_a = err.issues) === null || _a === void 0 ? void 0 : _a.map((issue) => ({
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
