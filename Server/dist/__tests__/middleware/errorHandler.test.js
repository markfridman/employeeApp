"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const errorHandler_1 = __importDefault(require("../../src/middleware/errorHandler"));
const config_1 = __importDefault(require("../../src/config"));
describe('Error Handler Middleware', () => {
    let mockRequest;
    let mockResponse;
    let nextFunction;
    beforeEach(() => {
        mockRequest = {};
        mockResponse = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        };
        nextFunction = jest.fn();
    });
    it('should respond with 500 status and error message', () => {
        const error = new Error('An error occurred');
        (0, errorHandler_1.default)(error, mockRequest, mockResponse, nextFunction);
        expect(mockResponse.status).toHaveBeenCalledWith(500);
        expect(mockResponse.json).toHaveBeenCalledWith({ message: 'An error occurred' });
    });
    it('should log the error stack', () => {
        const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation();
        const error = new Error('An error occurred');
        (0, errorHandler_1.default)(error, mockRequest, mockResponse, nextFunction);
        expect(consoleErrorSpy).toHaveBeenCalledWith(error.stack);
        consoleErrorSpy.mockRestore();
    });
    it('should return actual error message in non-production environment', () => {
        const originalNodeEnv = config_1.default.nodeEnv;
        config_1.default.nodeEnv = 'development';
        const error = new Error('Test error');
        (0, errorHandler_1.default)(error, mockRequest, mockResponse, nextFunction);
        expect(mockResponse.json).toHaveBeenCalledWith({ message: 'Test error' });
        config_1.default.nodeEnv = originalNodeEnv;
    });
});
