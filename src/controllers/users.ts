import { Request, Response } from 'express';
import User from '../models/user';

interface IUser {
  name: string,
  about: string,
  avatar: string
}

// eslint-disable-next-line import/prefer-default-export, arrow-body-style
export const getUsers = (req: Request, res: Response) => {
  return User.find({})
    .then((users: IUser[]) => res.send({ data: users }))
    .catch(() => res.status(500).send({ message: 'Произошла ошибка' }));
};

// export default getUsers;
