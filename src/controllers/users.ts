import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { SessionRequest } from '../middlewares/auth';
import {
  errorHandler, userAuthError, userNotFound,
} from '../utils/constants';
import User from '../models/user';

// eslint-disable-next-line import/prefer-default-export, arrow-body-style
export const getUsers = (_req: Request, res: Response) => {
  return User.find({})
    .then((users) => res.send({ data: users }))
    .catch((err) => errorHandler(err, res, {}));
};

export const getUser = (req: Request, res: Response) => {
  const { id } = req.params;

  return User.findById(id)
    .orFail()
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
  const {
    email, password, name, about, avatar,
  } = req.body;

  bcrypt.hash(password, 10)
    .then((h) => {
      User.create({
        email, password: h, name, about, avatar,
      })
        .then((user) => res.status(201).send({ user }))
        .catch((err) => {
          errorHandler(err, res, {
            invaild: `${err} Переданы некорректные данные при создании пользователя: ${email} ${password}`,
          });
        });
    });
};

export const patchUser = (req: SessionRequest, res: Response) => {
  const { name, about } = req.body;

  // eslint-disable-next-line no-underscore-dangle
  const _id = req.user?._id;

  return User.findByIdAndUpdate(_id, { name, about }, {
    new: true,
    runValidators: true,
  }).orFail()
    .then((user) => res.send({ user }))
    .catch((err) => errorHandler(err, res, {
      notFound: userNotFound,
      invaild: 'Переданы некорректные данные при обновлении профиля',
    }));
};

export const patchAvatar = (req: SessionRequest, res: Response) => {
  const { avatar } = req.body;
  // eslint-disable-next-line no-underscore-dangle
  const _id = req.user?._id;

  return User.findByIdAndUpdate(_id, { avatar }, {
    new: true,
    runValidators: true,
  }).orFail()
    .then((user) => res.send({ user }))
    .catch((err) => errorHandler(err, res, {
      notFound: userNotFound,
      invaild: 'Переданы некорректные данные при обновлении аватара',
    }));
};

const findUserByCredentials = (email: string, password: string) => User.findOne({ email })
  .select('+password')
  .orFail()
  .then((user) => {
    if (!user) {
      return Promise.reject(new Error(userAuthError));
    }
    return bcrypt.compare(password, user.password)
      .then((matched) => {
        if (matched) {
          return user;
        }

        return Promise.reject(new Error(userAuthError));
      });
  })
  .catch(() => {
    throw new Error(userAuthError);
  });

export const login = (req: Request, res: Response) => {
  const { email, password } = req.body;

  findUserByCredentials(email, password)
    .then((user) => {
      if (!user) {
        throw new Error(userAuthError);
      }
      // eslint-disable-next-line no-underscore-dangle
      res.send({ token: jwt.sign({ _id: user._id }, 'super-strong-secret', { expiresIn: '7d' }) });
    })
    .catch((err) => {
      res.status(401).send({ message: err.message });
    });
};

export const getMeInfo = (req: SessionRequest, res: Response) => {
  console.log(req);
  // eslint-disable-next-line no-underscore-dangle
  const _id = req.user?._id;

  // console.log(id);

  return User.findById(_id)
    .orFail()
    .then((user) => {
      res.send({ user });
    })
    .catch((err) => {
      errorHandler(err, res, {
        notFound: userNotFound,
        invaild: 'ffffff',
      });
    });
};
