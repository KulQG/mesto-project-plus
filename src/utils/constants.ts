import { Response } from 'express';

const DEF_ERROR = 500;
const NOT_FOUND_ERROR = 404;
const NOT_CORRECT_ERROR = 400;

export const cardNotFound = 'Карточка по указанному _id не найдена';
export const userNotFound = 'Пользователь с указанным _id не найден';

type TMessages = {
  notFound?: string,
  invaild?: string,
}

export const errorHandler = (err: any, res: Response, messages: TMessages) => {
  if (err.name === 'DocumentNotFoundError') res.status(NOT_FOUND_ERROR).send({ message: messages.notFound || 'Не найдено' });
  else if (err.name === 'CastError' || err.name === 'ValidationError') {
    res.status(NOT_CORRECT_ERROR).send({ message: messages.invaild || 'Введены некорректные данные' });
  } else res.status(DEF_ERROR).send(`Произошла ошибка: ${err.name}`);
};
