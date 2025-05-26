"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.refreshTokenValidation = void 0;
const zod_1 = require("zod");
exports.refreshTokenValidation = zod_1.z.object({
    cookies: zod_1.z.object({
        refreshToken: zod_1.z.string({
            required_error: 'REfresh Token Required',
        }),
    }),
});
