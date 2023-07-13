import { Request, Response, NextFunction } from 'express';

class HttpException extends Error {
  status: number;

  message: string;

  constructor(status: number, message: string) {
    super(message);
    this.status = status;
    this.message = message;
  }
}

export default (err: HttpException, req: Request, res: Response, next: NextFunction) => {
  res.status(500).send({ message: err.message });

  next();
};
