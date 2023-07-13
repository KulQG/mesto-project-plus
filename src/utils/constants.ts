import { NextFunction } from 'express';
import ServerError from '../errors/serverError';
import InvalidError from '../errors/invalidReq';
import NotFoundError from '../errors/notFound';
import DublicateError from '../errors/dublicate';

export const cardNotFound = 'Карточка по указанному _id не найдена';
export const userNotFound = 'Пользователь с указанным _id не найден';
export const userAuthError = 'Неправильные почта или пароль';
export const needAuth = 'Необходима авторизация';

type TMessages = {
  notFound?: string,
  invaild?: string,
}

export const errorHandler = (err: any, next: NextFunction, messages: TMessages) => {
  // eslint-disable-next-line no-new
  if (err.name === 'DocumentNotFoundError') next(new NotFoundError(messages.notFound || 'Файл не найден'));
  else if (err.name === 'CastError' || err.name === 'ValidationError') {
    // eslint-disable-next-line no-new
    next(new InvalidError(messages.invaild || 'Введены неккоректные данные'));
  // eslint-disable-next-line no-new
  } else if (err.code === 11000) next(new DublicateError('Такой email уже существует'));
  else next(new ServerError('На сервере произошла ошибка'));
};

// export const authErrorHandler = (res: Response, err?: any) => {
//   res.status(401).send({ message: err.massage || userAuthError });
// };
