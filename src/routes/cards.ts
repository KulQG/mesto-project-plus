import { Router } from 'express';
import {
  deleteCard, dislikeCard, getCard, getCards, likeCard, postCard,
} from '../controllers/cards';

const router = Router();

router.get('/', getCards);

router.get('/:id', getCard);

router.post('/', postCard);

router.delete('/:id', deleteCard);

router.put('/:id/likes', likeCard);

router.delete('/:id/likes', dislikeCard);

export default router;
