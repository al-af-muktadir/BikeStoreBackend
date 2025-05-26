"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sendRespose = (res, data) => {
    return res.status(data.statusCode).send({
        success: true,
        statusCode: data.statusCode,
        message: data.message,
        data: data.data,
    });
};
exports.default = sendRespose;
