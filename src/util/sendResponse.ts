/* eslint-disable @typescript-eslint/no-explicit-any */
import { Response } from 'express';

type Tdata<T> = {
  statusCode: number;
  message: string;
  data: T | T[] | null | any;
};

const sendRespose = <T>(res: Response, data: Tdata<T>) => {
  return res.status(data.statusCode).send({
    success: true,
    statusCode: data.statusCode,
    message: data.message,
    data: data.data,
  });
};

export default sendRespose;
