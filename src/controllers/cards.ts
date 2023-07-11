import { Request, Response } from 'express';
// import { ObjectId, Schema } from 'mongoose';
import Card from '../models/card';
import { errorHandler, cardNotFound } from '../utils/constants';

export const getCards = (_req: Request, res: Response) => Card.find({})
  .then((cards) => res.send({ cards }))
  .catch((err) => errorHandler(err, res, {}));

export const getCard = (req: Request, res: Response) => {
  const { id } = req.params;

  return Card.findById(id)
    .then((card) => res.send({ card }))
    .catch((err) => errorHandler(err, res, {
      notFound: cardNotFound,
    }));
};

export const postCard = (req: Request, res: Response) => {
  const { name, link } = req.body;
  // eslint-disable-next-line no-underscore-dangle
  const owner = req.user._id;

  return Card.create({ name, link, owner })
    .then((card) => res.send({ card }))
    .catch((err) => errorHandler(err, res, {
      invaild: 'Переданы некорректные данные при создании карточки',
    }));
};

export const deleteCard = (req: Request, res: Response) => {
  const { id } = req.params;

  return Card.findByIdAndDelete(id)
    .orFail()
    .then(() => res.send({ message: 'card deleted' }))
    .catch((err) => errorHandler(err, res, {
      notFound: cardNotFound,
    }));
};

export const likeCard = (req: Request, res: Response) => {
  const { id } = req.params;
  const { _id } = req.user;
  return Card.findByIdAndUpdate(id, { $addToSet: { likes: _id } }, { new: true })
    .orFail()
    .then((card) => res.send({ card }))
    .catch((err) => errorHandler(err, res, {
      notFound: cardNotFound,
      invaild: 'Переданы некорректные данные для постановки лайка',
    }));
};

export const dislikeCard = (req: Request, res: Response) => {
  const { id } = req.params;
  const { _id } = req.user;

  return Card.findByIdAndUpdate(
    id,
    { $pull: { likes: _id } },
    { new: true },
  )
    .orFail()
    .then((card) => res.send({ card }))
    .catch((err) => errorHandler(err, res, {
      notFound: cardNotFound,
      invaild: 'Переданы некорректные данные для удаления лайка',
    }));
};
