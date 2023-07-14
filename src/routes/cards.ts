import { Router } from 'express';
import { celebrate, Joi } from 'celebrate';
import {
  deleteCard, dislikeCard, getCard, getCards, likeCard, postCard,
} from '../controllers/cards';

const router = Router();

router.get('/', celebrate({
  headers: Joi.object().keys({
    authorization: Joi.string().alphanum().required(),
  }).unknown(true),
}), getCards);

router.get('/:id', celebrate({
  params: Joi.object().keys({
    id: Joi.string().alphanum().length(24),
  }),
  headers: Joi.object().keys({
    authorization: Joi.string().alphanum().required(),
  }).unknown(true),
}), getCard);

router.post('/', celebrate({
  headers: Joi.object().keys({
    authorization: Joi.string().alphanum().required(),
  }).unknown(true),
  body: Joi.object().keys({
    name: Joi.string()
      .alphanum()
      .min(2)
      .max(30)
      .required(),
    link: Joi.string().alphanum().min(7).required(),
    owner: Joi.string().alphanum().length(24).required(),
  }),
}), postCard);

router.delete('/:id', celebrate({
  params: Joi.object().keys({
    id: Joi.string().alphanum().length(24),
  }),
  headers: Joi.object().keys({
    authorization: Joi.string().alphanum().required(),
  }).unknown(true),
}), deleteCard);

router.put('/:id/likes', celebrate({
  headers: Joi.object().keys({
    authorization: Joi.string().alphanum().required(),
  }).unknown(true),
  params: Joi.object().keys({
    id: Joi.string().alphanum().length(24),
  }),
}), likeCard);

router.delete('/:id/likes', celebrate({
  headers: Joi.object().keys({
    authorization: Joi.string().alphanum().required(),
  }).unknown(true),
  params: Joi.object().keys({
    id: Joi.string().alphanum().length(24),
  }),
}), dislikeCard);

export default router;
