"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const OrderSchema = new mongoose_1.Schema({
    User: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'user-collection',
        required: true,
    },
    products: [
        {
            product: {
                type: mongoose_1.Schema.Types.ObjectId,
                ref: 'bike-collection',
                required: true,
            },
            quantity: {
                type: Number,
                required: true,
            },
        },
    ],
    totalPrice: {
        type: Number,
        required: true,
    },
    status: {
        type: String,
        enum: ['Pending', 'Delivered'],
        default: 'Pending',
    },
    transaction: {
        id: String,
        transactionStatus: String,
        bank_status: String,
        sp_code: String,
        sp_message: String,
        method: String,
    },
}, {
    timestamps: true,
});
const OrderModel = (0, mongoose_1.model)('order-collection', OrderSchema);
exports.default = OrderModel;
