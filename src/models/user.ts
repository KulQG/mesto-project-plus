import mongoose from 'mongoose';
import isEmail from 'validator/lib/isEmail';

interface IUser {
  name: string,
  about: string,
  avatar: string,
  email: string,
  password: string,
}

const userSchema = new mongoose.Schema<IUser>({
  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator(v: string) {
        return isEmail(v);
      },
      message: 'Неккоректный адрес электронной почты',
    },
  },
  password: {
    type: String,
    required: true,
    select: false,
  },
  name: {
    type: String,
    minlength: 2,
    maxlength: 30,
    default: 'Жак-Ив Кусто',
  },
  about: {
    type: String,
    minlength: 2,
    maxlength: 200,
    default: 'Исследователь',
  },
  avatar: {
    type: String,
    validate: {
      validator(value: string) {
        // eslint-disable-next-line no-useless-escape
        const urlPattern = /^(https?:\/\/)?(www\.)?[a-zA-Z0-9]+(\-[a-zA-Z0-9]+)*\.[a-zA-Z0-9]+(\-[a-zA-Z0-9]+)*(\.[a-zA-Z]{2,})((\/[-a-zA-Z0-9_.~:/?#[\]@!$&'()*+,;=]*)?(#[-a-zA-Z0-9_.~:/?#[\]@!$&'()*+,;=]*)?)?$/;
        return urlPattern.test(value);
      },
      message: 'Invalid URL',
    },
    default: 'https://pictures.s3.yandex.net/resources/jacques-cousteau_1604399756.png',
  },
});

export default mongoose.model('user', userSchema);
