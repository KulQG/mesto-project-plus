import { Request, Response } from 'express';
import { errorHandler, userNotFound } from '../utils/constants';
import User from '../models/user';

// eslint-disable-next-line import/prefer-default-export, arrow-body-style
export const getUsers = async (_req: Request, res: Response) => {
  return User.find({})
    .then((users) => res.send({ data: users }))
    .catch((err) => errorHandler(err, res, {}));
};

export const getUser = (req: Request, res: Response) => {
  const { id } = req.params;

  return User.findById(id)
    .then((user) => {
      res.send({ user });
    })
    .catch((err) => {
      errorHandler(err, res, {
        notFound: userNotFound,
      });
    });
};

export const postUser = (req: Request, res: Response) => {
  const { name, about, avatar } = req.body;

  return User.create({ name, about, avatar })
    .then((user) => res.send(user))
    .catch((err) => {
      errorHandler(err, res, {
        invaild: 'Переданы некорректные данные при создании пользователя',
      });
    });
};

export const patchUser = (req: Request, res: Response) => {
  const { name, about } = req.body;
  const { _id } = req.user;

  return User.findByIdAndUpdate(_id, { name, about }, {
    new: true,
    runValidators: true,
  })
    .then((user) => res.send(user))
    .catch((err) => errorHandler(err, res, {
      notFound: userNotFound,
      invaild: 'Переданы некорректные данные при обновлении профиля',
    }));
};

export const patchAvatar = (req: Request, res: Response) => {
  const { avatar } = req.body;
  const { _id } = req.user;

  return User.findByIdAndUpdate(_id, { avatar }, {
    new: true,
    runValidators: true,
  })
    .then((user) => res.send(user))
    .catch((err) => errorHandler(err, res, {
      notFound: userNotFound,
      invaild: 'Переданы некорректные данные при обновлении аватара',
    }));
};
