import { Request, Response, NextFunction } from 'express';
import config from '../config';

const errorHandler = (err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error(err.stack);
  
  const statusCode = 500;
  const message = config.nodeEnv === 'production' ? 'An error occurred' : err.message;

  res.status(statusCode).json({ message });
};

export default errorHandler;