import { Router } from 'express';
import {
  // getMeInfo,
  getUser, getUsers, patchAvatar, patchUser,
} from '../controllers/users';

const router = Router();

router.get('/', getUsers);

router.get('/:id', getUser);

router.get('/me', () => console.log('yes')); // заглушка, чтобы посмотреть не от контроллера ли ошибка

router.patch('/me', patchUser);

router.patch('/me/avatar', patchAvatar);

export default router;
