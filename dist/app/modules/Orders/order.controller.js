"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderController = void 0;
const order_service_1 = require("./order.service");
const CatchAsync_1 = __importDefault(require("../../../util/CatchAsync"));
const sendResponse_1 = __importDefault(require("../../../util/sendResponse"));
const http_status_codes_1 = require("http-status-codes");
const PostOrder = (0, CatchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const orders = req.body;
    const newOrder = Object.assign(Object.assign({}, orders), { User: (_a = req === null || req === void 0 ? void 0 : req.user) === null || _a === void 0 ? void 0 : _a._id });
    //console.log(newOrder, 'neworder');
    // ////console.log(newOrder);
    const result = yield order_service_1.OrderServices.CreateOrderInDb(newOrder, req.ip);
    // ////console.log(result);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_codes_1.StatusCodes.OK,
        message: 'Bike ordered Suceesfully',
        data: result,
    });
}));
const getAllOrder = (0, CatchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield order_service_1.OrderServices.getOrder();
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_codes_1.StatusCodes.OK,
        message: 'Order retrieved Succesfully',
        data: result,
    });
}));
const verifyPayment = (0, CatchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const order = yield order_service_1.OrderServices.verifyPayment(req.query.order_id);
    res.send({
        data: order,
    });
}));
const getREvenue = (0, CatchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    //console.log('kirevai');
    const result = yield order_service_1.OrderServices.OrderRevenue();
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_codes_1.StatusCodes.OK,
        message: 'Revenue  Succesfully',
        data: result,
    });
}));
const getEmailOrder = (0, CatchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    ////console.log(req.params.email);
    const result = yield order_service_1.OrderServices.getEmailOrderFromDb(req.params.email);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_codes_1.StatusCodes.OK,
        message: 'Order Retrieved Succesfully',
        data: result,
    });
}));
const updateStatus = (0, CatchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    ////console.log(req.params.id, req.body);
    const result = yield order_service_1.OrderServices.updateOrderStatus(req.params.id, req.body);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_codes_1.StatusCodes.OK,
        message: 'Order Status Changed Succesfully',
        data: result,
    });
}));
exports.OrderController = {
    PostOrder,
    getREvenue,
    getEmailOrder,
    verifyPayment,
    getAllOrder,
    updateStatus,
};
