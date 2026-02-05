import { NextFunction, Request, Response } from "express";


const globalErrorHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  console.log(err);
  let statusCode = 500;
  let message = 'Something went wrong!';
  let errorDetails: Record<string, any> = {};

  res.status(statusCode).json({
    success: false,
    message,
    errorDetails,
  });
};

export default globalErrorHandler;
