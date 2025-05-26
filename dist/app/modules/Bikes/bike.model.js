"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const BikeSchema = new mongoose_1.Schema({
    name: {
        type: String,
        required: true,
    },
    brand: { type: String, required: true },
    price: { type: Number, required: true },
    category: {
        type: String,
        enum: ['Mountain', 'Road', 'Hybrid', 'Electric'],
        required: true,
    },
    description: { type: String, required: true },
    quantity: { type: Number, required: true },
    inStock: { type: Boolean, required: true, default: true },
    image: { type: String, require: true },
}, { timestamps: true });
const BikeModel = (0, mongoose_1.model)('bike-collection', BikeSchema);
exports.default = BikeModel;
