import { Router } from 'express';
import { celebrate, Joi } from 'celebrate';
import { login, postUser } from '../controllers/users';

const router = Router();

router.post('/signup', celebrate({
  body: Joi.object().keys({
    email: Joi.string().email().required(),
    password: Joi.string().alphanum().required(),
  }),
}), login);

router.post('/signin', celebrate({
  body: Joi.object().keys({
    email: Joi.string().email().required(),
    password: Joi.string().alphanum().required(),
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(200),
    avatar: Joi.string().min(7),
  }),
}), postUser);

export default router;
