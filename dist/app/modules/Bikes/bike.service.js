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
exports.BikeServices = void 0;
const bike_model_1 = __importDefault(require("./bike.model"));
const mongodb_1 = require("mongodb");
const postBikeIntoDB = (bikes) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield bike_model_1.default.create(bikes);
    return result;
});
const getAllBikesFromDB = (query) => __awaiter(void 0, void 0, void 0, function* () {
    const copy = Object.assign({}, query);
    const searchFields = ['name', 'brand'];
    const excluded = [
        'search',
        'brand',
        'category',
        'inStock',
        'minPrice',
        'maxPrice',
        'page',
        'limit',
    ];
    excluded.forEach((el) => delete copy[el]);
    const search = query.search;
    const category = query.category;
    const brand = query.brand;
    const inStock = query.inStock;
    const minPrice = query.minPrice ? Number(query.minPrice) : undefined;
    const maxPrice = query.maxPrice ? Number(query.maxPrice) : undefined;
    const page = Number(query.page) || 1;
    const limit = Number(query.limit) || 6;
    const skip = (page - 1) * limit;
    const queryObject = {};
    if (search) {
        queryObject.$or = searchFields.map((field) => ({
            [field]: { $regex: search, $options: 'i' },
        }));
    }
    if (category)
        queryObject.category = category;
    if (brand)
        queryObject.brand = brand;
    if (inStock)
        queryObject.inStock = inStock === 'available';
    if (minPrice !== undefined || maxPrice !== undefined) {
        queryObject.price = {};
        if (minPrice !== undefined)
            queryObject.price.$gte = minPrice;
        if (maxPrice !== undefined)
            queryObject.price.$lte = maxPrice;
    }
    try {
        const filter = Object.keys(queryObject).length ? queryObject : {};
        const [bikes, total] = yield Promise.all([
            bike_model_1.default.find(filter).skip(skip).limit(limit),
            bike_model_1.default.countDocuments(filter),
        ]);
        return {
            success: true,
            data: bikes,
            meta: {
                total,
                page,
                limit,
                totalPages: Math.ceil(total / limit),
            },
        };
    }
    catch (err) {
        return {
            success: false,
            message: err,
        };
    }
});
const BikeById = (BikeId) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield bike_model_1.default.find({ _id: new mongodb_1.ObjectId(BikeId) });
    return result;
});
const updateBikeInDB = (id, bike) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield bike_model_1.default.findByIdAndUpdate(id, bike);
    return result;
});
const DeleteBikeFromDB = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield bike_model_1.default.deleteOne({ _id: new mongodb_1.ObjectId(id) });
    return result;
});
const getBikesByName = (name) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield bike_model_1.default.find({
        name: name,
    });
    return result;
});
exports.BikeServices = {
    postBikeIntoDB,
    getAllBikesFromDB,
    BikeById,
    updateBikeInDB,
    DeleteBikeFromDB,
    getBikesByName,
};
