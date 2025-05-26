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
exports.newsController = void 0;
const CatchAsync_1 = __importDefault(require("../../../util/CatchAsync"));
const news_service_1 = require("./news.service");
const createNews = (0, CatchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    //   console.log(req.body);
    const result = yield news_service_1.NewsServices.createNews(req.body);
    res.status(201).json({
        status: 'success',
        message: 'News created successfully',
        data: result,
    });
}));
const getNews = (0, CatchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log('hitted');
    const result = yield news_service_1.NewsServices.getNews();
    res.status(200).json({
        status: 'success',
        message: 'News fetched successfully',
        data: result,
    });
}));
const DeleteNews = (0, CatchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email } = req.params;
    const result = yield news_service_1.NewsServices.DeleteNews(email);
    res.status(200).json({
        status: 'success',
        message: 'News deleted successfully',
        data: result,
    });
}));
exports.newsController = {
    createNews,
    getNews,
    DeleteNews,
};
