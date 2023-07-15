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

const getNotFoundError = (message: string) => new NotFoundError(message);
const getInvalidError = (message: string) => new InvalidError(message);
const getDublicateError = (message: string) => new DublicateError(message);

export const errorHandler = (err: any, next: NextFunction, messages: TMessages) => {
  if (err.name === 'DocumentNotFoundError') next(getNotFoundError(messages.notFound || 'Файл не найден'));
  else if (err.name === 'CastError' || err.name === 'ValidationError') {
    next(getInvalidError(messages.invaild || 'Введены неккоректные данные'));
  } else if (err.code === 11000) next(getDublicateError('Такой email уже существует'));
  else next(new ServerError('На сервере произошла ошибка'));
};

export const extractBearerToken = (header: string) => header.replace('Bearer ', '');
