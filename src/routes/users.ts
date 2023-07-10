import { Router } from 'express';
import {
  getUser, getUsers, patchAvatar, patchUser, postUser,
} from '../controllers/users';

const router = Router();

router.get('/', getUsers);

router.post('/', postUser);

router.get('/:id', getUser);

router.patch('/me', patchUser);

router.patch('/me/avatar', patchAvatar);

export default router;
