import { Response } from 'express';

const DEF_ERROR = 500;
const NOT_FOUND_ERROR = 404;
const NOT_CORRECT_ERROR = 400;

export const cardNotFound = 'Карточка по указанному _id не найдена';
export const userNotFound = 'Пользователь с указанным _id не найден';
export const userAuthError = 'Неправильные почта или пароль';

type TMessages = {
  notFound?: string,
  invaild?: string,
}

export const errorHandler = (err: any, res: Response, messages: TMessages) => {
  if (err.name === 'DocumentNotFoundError') res.status(NOT_FOUND_ERROR).send({ message: messages.notFound || 'Не найдено' });
  else if (err.name === 'CastError' || err.name === 'ValidationError') {
    res.status(NOT_CORRECT_ERROR).send({ message: messages.invaild || `Введены некорректные данные${err.message} ` });
  } else res.status(DEF_ERROR).send({ message: `Произошла ошибка: ${err.name}` });
};

// export const authErrorHandler = (res: Response, err?: any) => {
//   res.status(401).send({ message: err.massage || userAuthError });
// };
