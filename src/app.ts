import express, { NextFunction, Request, Response } from 'express';
import mongoose from 'mongoose';
import { errors } from 'celebrate';
import errorsMiddleware from './middlewares/errors';
import authRouter from './routes/auth';
import auth from './middlewares/auth';
import usersRouter from './routes/users';
import cardsRouter from './routes/cards';
import { requestLogger, errorLogger } from './middlewares/logger';
import NotFoundError from './errors/notFound';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

mongoose.connect('mongodb://127.0.0.1/mestodb');

app.use(requestLogger);

app.use('/', authRouter);

app.use(auth);

app.use('/users', usersRouter);
app.use('/cards', cardsRouter);

// eslint-disable-next-line no-unused-vars
app.use((_req: Request, _res: Response, next: NextFunction) => {
  next(new NotFoundError('Не найдено'));
});

app.use(errorLogger);

app.use(errors());

app.use(errorsMiddleware);

app.listen(3000, () => {
  // eslint-disable-next-line no-console
  console.log('everything is cool!');
});
