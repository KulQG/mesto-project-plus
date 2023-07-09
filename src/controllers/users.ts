import { Request, Response } from 'express';
import User from '../models/user';

// interface IUser {
//   name: string,
//   about: string,
//   avatar: string
// }

// eslint-disable-next-line import/prefer-default-export, arrow-body-style
export const getUsers = async (_req: Request, res: Response) => {
  try {
    const users = await User.find({});
    return res.send({ data: users });
  } catch {
    return res.status(500).send({ message: 'Произошла ошибка' });
  }
};

// export default getUsers;
