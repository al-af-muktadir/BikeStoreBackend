"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const bike_route_1 = require("./app/modules/Bikes/bike.route");
const order_route_1 = __importDefault(require("./app/modules/Orders/order.route"));
const auth_route_1 = require("./app/modules/Auth/auth.route");
const globalErrorHandler_1 = require("./Error/globalErrorHandler");
const user_route_1 = require("./app/modules/User/user.route");
const news_route_1 = require("./app/modules/News/news.route");
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((0, cookie_parser_1.default)());
app.use((0, cors_1.default)({
    origin: [
        'http://localhost:5173',
        'http://localhost:5174',
        'https://bikefrontend-eikr.vercel.app',
    ],
    credentials: true,
}));
app.use('/api', bike_route_1.bikeRoute);
app.use('/api', auth_route_1.AuthRouter.route);
app.use('/api', user_route_1.UserRouter);
app.use('/api', order_route_1.default);
app.use('/api', news_route_1.newsRouter);
app.get('/', (req, res) => {
    res.send('Hello World!');
});
app.use(globalErrorHandler_1.globalErrorHandler);
exports.default = app;
