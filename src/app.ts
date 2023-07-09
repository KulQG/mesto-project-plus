import express, { Request, Response } from 'express';
import mongoose from 'mongoose';
import usersRouter from './routes/users';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

mongoose.connect('mongodb://127.0.0.1/mestodb');

app.get('/', (req: Request, res: Response) => {
  res.send('correct');
});

app.use('/users', usersRouter);

app.listen(3000, () => {
  // eslint-disable-next-line no-console
  console.log('everything is awesome!');
});
