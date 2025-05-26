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
exports.BikeController = void 0;
const bike_service_1 = require("./bike.service");
const CatchAsync_1 = __importDefault(require("../../../util/CatchAsync"));
const sendResponse_1 = __importDefault(require("../../../util/sendResponse"));
const http_status_codes_1 = require("http-status-codes");
//Post Bike Data
const createBike = (0, CatchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield bike_service_1.BikeServices.postBikeIntoDB(req.body);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_codes_1.StatusCodes.OK,
        message: 'Bike created Successfully',
        data: result,
    });
}));
//GET all BIKE
const getAllBikes = (0, CatchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // const { searchTerm } = req.query;
    const result = yield bike_service_1.BikeServices.getAllBikesFromDB(req.query);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_codes_1.StatusCodes.OK,
        message: ' Bikes Retrieved Succesfully',
        data: result,
    });
}));
const getBikeById = (0, CatchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const BikeId = req.params.productId;
    const result = yield bike_service_1.BikeServices.BikeById(BikeId);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_codes_1.StatusCodes.OK,
        message: 'Bike retrieved successfully',
        data: result,
    });
}));
const updateBike = (0, CatchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.productId;
    // ////console.log(req.params.productId, req.body.data);
    const result = yield bike_service_1.BikeServices.updateBikeInDB(id, req.body);
    // const result2 = await BikeServices.BikeById();id
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_codes_1.StatusCodes.OK,
        message: 'Bike Updated successfully',
        data: result,
    });
}));
const DeleteBike = (0, CatchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.productId;
    yield bike_service_1.BikeServices.DeleteBikeFromDB(id);
    const result2 = yield bike_service_1.BikeServices.BikeById(id);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_codes_1.StatusCodes.OK,
        message: 'Bike Deletd successfully',
        data: result2,
    });
}));
const getBikesByName = (0, CatchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield bike_service_1.BikeServices.getBikesByName(req.params.productNamae);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_codes_1.StatusCodes.OK,
        message: 'Bike retrieved successfully',
        data: result,
    });
}));
exports.BikeController = {
    createBike,
    getAllBikes,
    getBikeById,
    updateBike,
    DeleteBike,
    getBikesByName,
};
