"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.newsModel = void 0;
const mongoose_1 = require("mongoose");
const newsSchmea = new mongoose_1.Schema({
    email: {
        type: String,
        required: true,
        unique: true,
    },
    name: {
        type: String,
        required: true,
    },
}, { timestamps: true });
exports.newsModel = (0, mongoose_1.model)('news0collection', newsSchmea);
