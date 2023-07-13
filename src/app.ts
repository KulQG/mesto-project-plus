import express, { Request, Response } from 'express';
import mongoose from 'mongoose';
// import { JwtPayload } from 'jsonwebtoken';
import errors from './middlewares/errors';
import { login, postUser } from './controllers/users';
import auth from './middlewares/auth';
import usersRouter from './routes/users';
import cardsRouter from './routes/cards';

// declare global {
//   // eslint-disable-next-line no-unused-vars
//   namespace Express {
//     // eslint-disable-next-line no-shadow, no-unused-vars
//     interface Request {
//       user: { _id: string | JwtPayload}
//     }
//   }
// }

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

mongoose.connect('mongodb://127.0.0.1/mestodb');

app.post('/signup', postUser);
app.post('/signin', login);

app.use(auth);

app.use('/users', usersRouter);
app.use('/cards', cardsRouter);

app.use((_req: Request, res: Response) => {
  res.status(404).send({ message: 'Not found' });
});

app.use(errors);

app.listen(3000, () => {
  // eslint-disable-next-line no-console
  console.log('everything is cool!');
});
