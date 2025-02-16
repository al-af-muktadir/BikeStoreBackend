import { AnyZodObject } from 'zod';
import catchAsync from '../../util/CatchAsync';
// import { NextFunction, Request } from 'express';

const validateRequest = (schema: AnyZodObject) => {
  return catchAsync(async (req, res, next) => {
    schema.parseAsync(req.body);
    next();
  });
};

export default validateRequest;

// const validateRequest = (schema: AnyZodObject) => {
//     return async (req: Request, res: Response, next: NextFunction) => {
//       try {
//         await schema.parseAsync(req.body);
//         next(); // Proceed to the next middleware or route handler
//       } catch (error) {
//         next(error);
//       }
//     };
//   };
