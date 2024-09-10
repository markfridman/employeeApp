"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const config_1 = __importDefault(require("../config"));
const errorHandler = (err, req, res, next) => {
    console.error(err.stack);
    const statusCode = 500;
    const message = config_1.default.nodeEnv === 'production' ? 'An error occurred' : err.message;
    res.status(statusCode).json({ message });
};
exports.default = errorHandler;
