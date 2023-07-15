import { Router } from 'express';
import { celebrate, Joi } from 'celebrate';
import {
  deleteCard, dislikeCard, getCard, getCards, likeCard, postCard,
} from '../controllers/cards';

const router = Router();

router.get('/', getCards);

router.get('/:id', celebrate({
  params: Joi.object().keys({
    id: Joi.string().hex().length(24).required(),
  }),
}), getCard);

router.post('/', celebrate({
  body: Joi.object().keys({
    name: Joi.string()
      .alphanum()
      .min(2)
      .max(30)
      .required(),
    link: Joi.string().uri({
      scheme: [
        // eslint-disable-next-line no-useless-escape
        /^(https?:\/\/)?(www\.)?[a-zA-Z0-9]+(\-[a-zA-Z0-9]+)*\.[a-zA-Z0-9]+(\-[a-zA-Z0-9]+)*(\.[a-zA-Z]{2,})((\/[-a-zA-Z0-9_.~:/?#[\]@!$&'()*+,;=]*)?(#[-a-zA-Z0-9_.~:/?#[\]@!$&'()*+,;=]*)?)?$/,
      ],
    }).required(),
    owner: Joi.string().alphanum().length(24).required(),
  }),
}), postCard);

router.delete('/:id', celebrate({
  params: Joi.object().keys({
    id: Joi.string().hex().length(24).required(),
  }),
}), deleteCard);

router.put('/:id/likes', celebrate({
  params: Joi.object().keys({
    id: Joi.string().hex().length(24).required(),
  }),
}), likeCard);

router.delete('/:id/likes', celebrate({
  params: Joi.object().keys({
    id: Joi.string().hex().length(24).required(),
  }),
}), dislikeCard);

export default router;
