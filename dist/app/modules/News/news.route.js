"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.newsRouter = void 0;
const express_1 = __importDefault(require("express"));
const news_controller_1 = require("./news.controller");
const router = express_1.default.Router();
router.post('/news', news_controller_1.newsController.createNews);
router.get('/news', news_controller_1.newsController.getNews);
router.delete('/news/:email', news_controller_1.newsController.DeleteNews);
exports.newsRouter = router;
