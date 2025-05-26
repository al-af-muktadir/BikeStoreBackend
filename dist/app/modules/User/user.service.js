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
exports.userServices = void 0;
/* eslint-disable @typescript-eslint/no-explicit-any */
const user_model_1 = require("./user.model");
const mongodb_1 = require("mongodb");
const getUserFromDb = () => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield user_model_1.userModel.find();
    //   ////console.log(result);
    return result;
});
const getUserById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield user_model_1.userModel.findById(id);
    return result;
});
const UpdateStatusById = (id, status) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield user_model_1.userModel.updateOne({ _id: new mongodb_1.ObjectId(id) }, status);
    return result;
});
exports.userServices = {
    getUserFromDb,
    getUserById,
    UpdateStatusById,
};
