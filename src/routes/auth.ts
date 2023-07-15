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
    avatar: Joi.string().uri({
      scheme: [
        // eslint-disable-next-line no-useless-escape
        /^(https?:\/\/)?(www\.)?[a-zA-Z0-9]+(\-[a-zA-Z0-9]+)*\.[a-zA-Z0-9]+(\-[a-zA-Z0-9]+)*(\.[a-zA-Z]{2,})((\/[-a-zA-Z0-9_.~:/?#[\]@!$&'()*+,;=]*)?(#[-a-zA-Z0-9_.~:/?#[\]@!$&'()*+,;=]*)?)?$/,
      ],
    }),
  }),
}), postUser);

export default router;
