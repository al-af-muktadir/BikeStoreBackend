import { ZodError, ZodIssue } from 'zod';

type TErrorREturnType = {
  statusCode: number;
  message: string;
  error: TError;
};

export type TError = {
  path: string | number;
  message: string;
}[];

export const handleZodError = (err: ZodError): TErrorREturnType => {
  const error: TError = err.issues.map((issue: ZodIssue) => ({
    path: issue.path[issue.path.length - 1],
    message: issue.message,
  }));
  const statusCode = 400;
  return {
    statusCode,
    message: 'Zod Error',
    error,
  };
};
