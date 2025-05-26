"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.bikeRoute = void 0;
const express_1 = __importDefault(require("express"));
const bike_controller_1 = require("./bike.controller");
const auth_1 = require("../../middlewares/auth");
const ValidateRequest_1 = __importDefault(require("../../middlewares/ValidateRequest"));
const bikeValidation_1 = require("./bikeValidation");
const router = express_1.default.Router();
router.post('/products', (0, auth_1.auth)('admin'), (0, ValidateRequest_1.default)(bikeValidation_1.bikeValidationSchema), bike_controller_1.BikeController.createBike);
router.get('/products', bike_controller_1.BikeController.getAllBikes);
router.get('/product/:productNamae', bike_controller_1.BikeController.getBikesByName);
router.get('/products/:productId', bike_controller_1.BikeController.getBikeById);
router.patch('/products/:productId', (0, auth_1.auth)('admin'), bike_controller_1.BikeController.updateBike);
router.delete('/products/:productId', (0, auth_1.auth)('admin'), bike_controller_1.BikeController.DeleteBike);
exports.bikeRoute = router;
