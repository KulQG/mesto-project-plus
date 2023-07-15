import { NextFunction, Request, Response } from 'express';
import NoRootsError from '../errors/noRoots';
import Card from '../models/card';
import { errorHandler, cardNotFound } from '../utils/constants';

export const getCards = (_req: Request, res: Response, next: NextFunction) => Card.find({})
  .populate(['owner', 'likes'])
  .then((cards) => res.send({ cards }))
  .catch((err) => errorHandler(err, next, {}));

export const getCard = (req: Request, res: Response, next: NextFunction) => {
  const { id } = req.params;

  return Card.findById(id)
    .populate(['owner', 'likes'])
    .then((card) => res.send({ card }))
    .catch((err) => errorHandler(err, next, {
      notFound: cardNotFound,
    }));
};

export const postCard = (req: Request, res: Response, next: NextFunction) => {
  const { name, link } = req.body;
  const owner = req.user?._id;

  return Card.create({ name, link, owner })
    .then((card) => res.send({ card }))
    .catch((err) => errorHandler(err, next, {
      invaild: 'Переданы некорректные данные при создании карточки',
    }));
};

const findCard = (idCard: string, userId: any) => Card.findById({ _id: idCard })
  .orFail()
  // eslint-disable-next-line consistent-return
  .then((card) => {
    const match = card._id === userId;

    if (!match) throw new NoRootsError('У вас нет доступа');
    else return Card.findByIdAndDelete(idCard);
  });

export const deleteCard = (req: Request, res: Response, next: NextFunction) => {
  const { idCard } = req.params;
  const userId = req.user?._id;

  findCard(idCard, userId)
    .then(() => res.send({ message: 'card deleted' }))
    .catch((err) => errorHandler(err, next, {
      notFound: cardNotFound,
    }));
};

export const likeCard = (req: Request, res: Response, next: NextFunction) => {
  const { id } = req.params;

  const _id = req.user?._id;

  return Card.findByIdAndUpdate(id, { $addToSet: { likes: _id } }, { new: true })
    .orFail()
    .populate(['owner', 'likes'])
    .then((card) => res.send({ card }))
    .catch((err) => errorHandler(err, next, {
      notFound: cardNotFound,
      invaild: 'Переданы некорректные данные для постановки лайка',
    }));
};

export const dislikeCard = (req: Request, res: Response, next: NextFunction) => {
  const { id } = req.params;

  const _id = req.user?._id;

  return Card.findByIdAndUpdate(
    id,
    { $pull: { likes: _id } },
    { new: true },
  )
    .orFail()
    .populate(['owner', 'likes'])
    .then((card) => res.send({ card }))
    .catch((err) => errorHandler(err, next, {
      notFound: cardNotFound,
      invaild: 'Переданы некорректные данные для удаления лайка',
    }));
};
