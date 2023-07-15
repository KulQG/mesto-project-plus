import { NextFunction, Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import {
  errorHandler, userAuthError, userNotFound,
} from '../utils/constants';
import User from '../models/user';
import NotFoundError from '../errors/notFound';
import AuthError from '../errors/authError';

export const getUsers = async (_req: Request, res: Response, next: NextFunction) => {
  try {
    const users = await User.find({});
    return res.send({ data: users });
  } catch (err) {
    return errorHandler(err, next, {});
  }
};

export const getUser = (req: Request, res: Response, next: NextFunction) => {
  const { id } = req.params;

  return User.findById(id)
    .then((user) => {
      if (!user) throw new NotFoundError(userNotFound);

      res.send({ user });
    })
    .catch(next);
};

export const postUser = (req: Request, res: Response, next: NextFunction) => {
  const {
    email, password, name, about, avatar,
  } = req.body;

  bcrypt.hash(password, 10)
    .then((h) => {
      User.create({
        email, password: h, name, about, avatar,
      })
        .then((user) => res.status(201).send({ user }))
        .catch((e) => {
          errorHandler(e, next, {
            invaild: 'Переданы некорректные данные при создании пользователя',
          });
        });
    })
    .catch((e) => {
      errorHandler(e, next, {
        invaild: 'Переданы некорректные данные при создании пользователя',
      });
    });
};

export const patchUser = (req: Request, res: Response, next: NextFunction) => {
  const { name, about } = req.body;

  const _id = req.user?._id;

  return User.findByIdAndUpdate(_id, { name, about }, {
    new: true,
    runValidators: true,
  }).orFail()
    .then((user) => res.send({ user }))
    .catch((err) => errorHandler(err, next, {
      notFound: userNotFound,
      invaild: 'Переданы некорректные данные при обновлении профиля',
    }));
};

export const patchAvatar = (req: Request, res: Response, next: NextFunction) => {
  const { avatar } = req.body;
  const _id = req.user?._id;

  return User.findByIdAndUpdate(_id, { avatar }, {
    new: true,
    runValidators: true,
  }).orFail()
    .then((user) => res.send({ user }))
    .catch((err) => errorHandler(err, next, {
      notFound: userNotFound,
      invaild: 'Переданы некорректные данные при обновлении аватара',
    }));
};

const findUserByCredentials = (email: string, password: string) => User.findOne({ email })
  .select('+password')
  .orFail()
  .then((user) => {
    if (!user) {
      return Promise.reject(new AuthError(userAuthError));
    }
    return bcrypt.compare(password, user.password)
      .then((matched) => {
        if (matched) {
          return user;
        }

        return Promise.reject(new AuthError(userAuthError));
      });
  });

export const login = (req: Request, res: Response, next: NextFunction) => {
  const { email, password } = req.body;

  findUserByCredentials(email, password)
    .then((user) => {
      res.send({ token: jwt.sign({ _id: user._id }, 'super-strong-secret', { expiresIn: '7d' }) });
    })
    .catch(next);
};

export const getMeInfo = (req: Request, res: Response, next: NextFunction) => {
  const _id = req.user?._id;

  return User.findById(_id)
    .orFail()
    .then((user) => {
      res.send({ user });
    })
    .catch((err) => {
      errorHandler(err, next, {
        notFound: userNotFound,
      });
    });
};
