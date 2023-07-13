import { Request, Response } from 'express';
// import { ObjectId, Schema } from 'mongoose';
import Card from '../models/card';
import { errorHandler, cardNotFound } from '../utils/constants';
import { SessionRequest } from '../middlewares/auth';

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

export const postCard = (req: SessionRequest, res: Response) => {
  const { name, link } = req.body;
  // eslint-disable-next-line no-underscore-dangle
  const owner = req.user?._id;

  return Card.create({ name, link, owner })
    .then((card) => res.send({ card }))
    .catch((err) => errorHandler(err, res, {
      invaild: 'Переданы некорректные данные при создании карточки',
    }));
};

const findCard = (idCard: string, userId: any, res: Response) => Card.findById({ _id: idCard })
  .orFail()
  // eslint-disable-next-line consistent-return
  .then((card) => {
    // eslint-disable-next-line no-underscore-dangle
    const match = card._id === userId;

    if (!match) res.status(403).send({ message: 'У вас нет доступа' });
    else return Card.findByIdAndDelete(idCard);
  });

export const deleteCard = (req: SessionRequest, res: Response) => {
  const { idCard } = req.params;
  // eslint-disable-next-line no-underscore-dangle
  const userId = req.user?._id;

  findCard(idCard, userId, res)
    .then(() => res.send({ message: 'card deleted' }))
    .catch((err) => errorHandler(err, res, {
      notFound: cardNotFound,
    }));
};

export const likeCard = (req: SessionRequest, res: Response) => {
  const { id } = req.params;

  // eslint-disable-next-line no-underscore-dangle
  const _id = req.user?._id;

  return Card.findByIdAndUpdate(id, { $addToSet: { likes: _id } }, { new: true })
    .orFail()
    .then((card) => res.send({ card }))
    .catch((err) => errorHandler(err, res, {
      notFound: cardNotFound,
      invaild: 'Переданы некорректные данные для постановки лайка',
    }));
};

export const dislikeCard = (req: SessionRequest, res: Response) => {
  const { id } = req.params;

  // eslint-disable-next-line no-underscore-dangle
  const _id = req.user?._id;

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
