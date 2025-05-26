"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.bikeValidationSchema = void 0;
const zod_1 = require("zod");
exports.bikeValidationSchema = zod_1.z.object({
    name: zod_1.z.string().nonempty('Name is required'),
    brand: zod_1.z.string().nonempty('Brand is required'),
    price: zod_1.z.number().positive('Price must be greater than 0'),
    category: zod_1.z.enum(['Mountain', 'Road', 'Hybrid', 'Electric']),
    description: zod_1.z.string().nonempty('Description is required'),
    image: zod_1.z.string().nonempty('image is required'),
    quantity: zod_1.z
        .number()
        .int()
        .nonnegative('Quantity must be a non-negative integer'),
});
