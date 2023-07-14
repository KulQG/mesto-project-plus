import { Router } from 'express';
import { celebrate, Joi } from 'celebrate';
import {
  getMeInfo,
  getUser, getUsers, patchAvatar, patchUser,
} from '../controllers/users';

const router = Router();

router.get('/', celebrate({
  headers: Joi.object().keys({
    authorization: Joi.string().alphanum().required(),
  }).unknown(true),
}), getUsers);

router.get('/me', celebrate({
  headers: Joi.object().keys({
    authorization: Joi.string().alphanum().required(),
  }).unknown(true),
}), getMeInfo);

router.patch('/me', celebrate({
  headers: Joi.object().keys({
    authorization: Joi.string().alphanum().required(),
  }).unknown(true),
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    about: Joi.string().alphanum().min(20).max(200),
  }),
}), patchUser);

router.patch('/me/avatar', celebrate({
  headers: Joi.object().keys({
    authorization: Joi.string().alphanum().required(),
  }).unknown(true),
  body: Joi.object().keys({
    avatar: Joi.string().alphanum().min(7).required(),
  }),
}), patchAvatar);

router.get('/:id', celebrate({
  headers: Joi.object().keys({
    authorization: Joi.string().alphanum().required(),
  }).unknown(true),
  params: Joi.object().keys({
    id: Joi.string().alphanum().length(24),
  }),
}), getUser);

export default router;
