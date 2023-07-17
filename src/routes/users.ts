import { Router } from 'express';
import { celebrate, Joi } from 'celebrate';
import {
  getMeInfo,
  getUser, getUsers, patchAvatar, patchUser,
} from '../controllers/users';
import { validUrlPattern } from '../utils/constants';

const router = Router();

router.get('/', getUsers);

router.get('/me', getMeInfo);

router.patch('/me', celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30).required(),
    about: Joi
      .string()
      .alphanum()
      .min(20)
      .max(200)
      .required(),
  }),
}), patchUser);

router.patch('/me/avatar', celebrate({
  body: Joi.object().keys({
    avatar: Joi.string().regex(validUrlPattern).required(),
  }),
}), patchAvatar);

router.get('/:id', celebrate({
  params: Joi.object().keys({
    id: Joi.string().hex().length(24).required(),
  }),
}), getUser);

export default router;
