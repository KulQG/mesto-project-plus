import mongoose, { Schema } from 'mongoose';

interface ICard {
  name: string,
  link: string,
  owner: mongoose.Types.ObjectId,
  likes: mongoose.Types.ObjectId[],
  createdAt: Date
}

const cardSchema = new mongoose.Schema<ICard>({
  name: {
    type: String,
    minlength: 2,
    maxlength: 30,
    required: true,
  },
  link: {
    type: String,
    validate: {
      validator(value: string) {
        // eslint-disable-next-line no-useless-escape
        const urlPattern = /^(https?:\/\/)?(www\.)?[a-zA-Z0-9]+(\-[a-zA-Z0-9]+)*\.[a-zA-Z0-9]+(\-[a-zA-Z0-9]+)*(\.[a-zA-Z]{2,})((\/[-a-zA-Z0-9_.~:/?#[\]@!$&'()*+,;=]*)?(#[-a-zA-Z0-9_.~:/?#[\]@!$&'()*+,;=]*)?)?$/;
        return urlPattern.test(value);
      },
      message: 'Invalid URL',
    },
    required: true,
  },
  owner: {
    type: Schema.Types.ObjectId,
    required: true,
  },
  likes: {
    type: [Schema.Types.ObjectId],
    default: [],
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

export default mongoose.model('card', cardSchema);
