import { Request, Response, NextFunction } from 'express';

class HttpException extends Error {
  status: number;

  constructor(status: number, message: string) {
    super(message);
    this.status = status;
  }
}

export default (err: HttpException, req: Request, res: Response, next: NextFunction) => {
  const { status = 500, message } = err;

  res
    .status(status)
    .send({
      message: status === 500
        ? 'На сервере произошла ошибка'
        : message,
    });

  next();
};
