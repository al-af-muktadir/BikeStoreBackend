"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const order_controller_1 = require("./order.controller");
const auth_1 = require("../../middlewares/auth");
const orderRoute = express_1.default.Router();
orderRoute.get('/orders/totalrevenue', (0, auth_1.auth)('admin'), order_controller_1.OrderController.getREvenue);
orderRoute.post('/orders', (0, auth_1.auth)('customer'), order_controller_1.OrderController.PostOrder);
orderRoute.get('/orders/verify', (0, auth_1.auth)('customer'), order_controller_1.OrderController.verifyPayment);
orderRoute.get('/orders', (0, auth_1.auth)('admin'), order_controller_1.OrderController.getAllOrder);
orderRoute.get('/orders/:email', (0, auth_1.auth)('customer'), order_controller_1.OrderController.getEmailOrder);
orderRoute.patch('/orders/:id', (0, auth_1.auth)('admin'), order_controller_1.OrderController.updateStatus);
exports.default = orderRoute;
