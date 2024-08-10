import { Request, Response, NextFunction } from 'express';

export const errorNotFoundMiddleware = (req: Request, res: Response, next: NextFunction): void => {
  res.status(404).json({ 
    message: 'Not Found'
  });
};

export const errorServerMiddleware = (err: any, req: Request, res: Response, next: NextFunction): void => {
  console.error(err.stack);
  res.status(500).json({ 
    message: 'Internal Server Error' 
  });
};