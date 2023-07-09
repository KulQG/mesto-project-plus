import express from 'express';
import mongoose from 'mongoose';
import usersRouter from './routes/users';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

mongoose.connect('mongodb://localhost:27017/mestodb');

app.use('/users', usersRouter);

app.listen(3000, () => {
  // eslint-disable-next-line no-console
  console.log('everything is awesome!');
});
