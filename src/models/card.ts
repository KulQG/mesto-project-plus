import mongoose, { ObjectId, Schema } from 'mongoose';

interface ICard {
  name: string,
  link: string,
  owner: ObjectId,
  likes: ObjectId[],
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
    required: true,
  },
  owner: {
    type: Schema.Types.ObjectId,
    required: true,
  },
  likes: [{
    type: Schema.Types.ObjectId,
    required: true,
    default: [],
  }],
  createdAt: {
    type: Date,
    required: true,
    default: Date.now(),
  },
});

export default mongoose.model('card', cardSchema);
