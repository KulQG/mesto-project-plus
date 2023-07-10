import express, { Request, Response, NextFunction } from 'express';
import mongoose from 'mongoose';
import usersRouter from './routes/users';
import cardsRouter from './routes/cards';

declare global {
  // eslint-disable-next-line no-unused-vars
  namespace Express {
    // eslint-disable-next-line no-shadow, no-unused-vars
    interface Request {
      user: { _id: string}
    }
  }
}

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

mongoose.connect('mongodb://127.0.0.1/mestodb');

app.use('/users', usersRouter);

app.use((req: Request, _res: Response, next: NextFunction) => {
  req.user = {
    _id: '64abe721f1d984f0ee247ed3',
  };

  next();
});

app.use('/cards', cardsRouter);

app.listen(3000, () => {
  // eslint-disable-next-line no-console
  console.log('everything is cool!');
});
