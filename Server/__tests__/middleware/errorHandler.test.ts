import { Request, Response } from 'express';
import errorHandler from '../../src/middleware/errorHandler';
import config from '../../src/config';

describe('Error Handler Middleware', () => {
  let mockRequest: Partial<Request>;
  let mockResponse: Partial<Response>;
  let nextFunction: jest.Mock;

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
    errorHandler(error, mockRequest as Request, mockResponse as Response, nextFunction);

    expect(mockResponse.status).toHaveBeenCalledWith(500);
    expect(mockResponse.json).toHaveBeenCalledWith({ message: 'An error occurred' });
  });

  it('should log the error stack', () => {
    const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation();
    const error = new Error('An error occurred');
    errorHandler(error, mockRequest as Request, mockResponse as Response, nextFunction);

    expect(consoleErrorSpy).toHaveBeenCalledWith(error.stack);
    consoleErrorSpy.mockRestore();
  });

  it('should return actual error message in non-production environment', () => {
    const originalNodeEnv = config.nodeEnv;
    config.nodeEnv = 'development';

    const error = new Error('Test error');
    errorHandler(error, mockRequest as Request, mockResponse as Response, nextFunction);

    expect(mockResponse.json).toHaveBeenCalledWith({ message: 'Test error' });

    config.nodeEnv = originalNodeEnv;
  });
});