import { Router } from 'express';
import { celebrate, Joi } from 'celebrate';
import {
  getMeInfo,
  getUser, getUsers, patchAvatar, patchUser,
} from '../controllers/users';

const router = Router();

router.get('/', getUsers);

router.get('/me', getMeInfo);

router.patch('/me', celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    about: Joi.string().alphanum().min(20).max(200),
  }),
}), patchUser);

router.patch('/me/avatar', celebrate({
  body: Joi.object().keys({
    avatar: Joi.string().uri({
      scheme: [
        // eslint-disable-next-line no-useless-escape
        /^(https?:\/\/)?(www\.)?[a-zA-Z0-9]+(\-[a-zA-Z0-9]+)*\.[a-zA-Z0-9]+(\-[a-zA-Z0-9]+)*(\.[a-zA-Z]{2,})((\/[-a-zA-Z0-9_.~:/?#[\]@!$&'()*+,;=]*)?(#[-a-zA-Z0-9_.~:/?#[\]@!$&'()*+,;=]*)?)?$/,
      ],
    }).required(),
  }),
}), patchAvatar);

router.get('/:id', celebrate({
  params: Joi.object().keys({
    id: Joi.string().alphanum().length(24).required(),
  }),
}), getUser);

export default router;
