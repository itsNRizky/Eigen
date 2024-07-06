import { Response } from 'express';

export const ok = (
  res: Response,
  data: any,
  message = 'success',
  status = 200
) => {
  return res.status(status).json({
    success: true,
    status: status,
    message: message,
    data: data,
  });
};

export const fail = (res: Response, error: any, status = 500) => {
  console.error(error);

  return res.status(status).json({
    success: false,
    status: status,
    message: 'error',
    data: error.message,
  });
};
