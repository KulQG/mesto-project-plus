import { Response, Request, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import AuthError from '../errors/authError';
import { needAuth } from '../utils/constants';

// export interface SessionRequest extends Request {
//     user?: { _id: string | JwtPayload };
// }

// const handleAuthError = (res: Response) => {
//   res
//     .status(401)
//     .send({ message: 'Необходима авторизация' });
// };

const extractBearerToken = (header: string) => header.replace('Bearer ', '');

// eslint-disable-next-line consistent-return
export default (req: Request, res: Response, next: NextFunction) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith('Bearer ')) {
    return next(new AuthError(needAuth));
  }

  const token = extractBearerToken(authorization);

  let payload;

  try {
    payload = jwt.verify(token, 'super-strong-secret');
  } catch (err) {
    return next(new Error(needAuth));
  }

  req.user = { _id: payload };

  next();
};
