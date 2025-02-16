/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import mongoose from 'mongoose';
import { ZodError } from 'zod';
import { handleZodError, TError } from './handleZodError';
import { AppError } from './AppError';

export const globalErrorHandler = (
  err: any,
  req: Request,
  res: Response,
  // eslint-disable-next-line no-unused-vars
  _next: NextFunction,
) => {
  let statusCode = 400;
  let message = 'something Went Wrong';
  let error: TError = [
    {
      path: '',
      message: 'Somethinng Went Wrong',
    },
  ];

  if (err instanceof mongoose.Error.ValidationError) {
    res.send({
      success: false,
      statusCode: StatusCodes.BAD_REQUEST,
      message: err.message,
      error: err.errors.name.name,
    });
  } else if (err instanceof ZodError) {
    const SimplifiedError = handleZodError(err);
    statusCode = SimplifiedError.statusCode;
    message = SimplifiedError.message;
    error = SimplifiedError.error;

    res.send({
      success: false,
      statusCode,
      message,
      error,
    });
  } else if (err instanceof AppError) {
    statusCode = err?.statusCode;
    message = err.message;
    error = [
      {
        path: '',
        message: err?.message,
      },
    ];
    res.status(statusCode).json({
      success: false,
      statusCode: statusCode,
      message: message,
      error: error,
    });
  } else if (err instanceof Error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({
      success: false,
      statusCode: StatusCodes.INTERNAL_SERVER_ERROR,
      message: message,
      error: error,
    });
  }
};
