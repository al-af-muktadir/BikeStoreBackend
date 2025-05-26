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
Object.defineProperty(exports, "__esModule", { value: true });
exports.NewsServices = void 0;
/* eslint-disable @typescript-eslint/no-explicit-any */
const news_model_1 = require("./news.model");
/* eslint-disable @typescript-eslint/no-unused-vars */
const createNews = (news) => __awaiter(void 0, void 0, void 0, function* () {
    const res = yield news_model_1.newsModel.create(news);
    return res;
});
const getNews = () => __awaiter(void 0, void 0, void 0, function* () {
    const res = yield news_model_1.newsModel.find();
    return res;
});
const DeleteNews = (email) => __awaiter(void 0, void 0, void 0, function* () {
    const res = yield news_model_1.newsModel.deleteOne({ email: email });
    return res;
});
exports.NewsServices = {
    createNews,
    getNews,
    DeleteNews,
};
