import { Router } from 'express';
import authMiddleware from '../app/middlewares/auth';
import TweetController from '../app/controllers/TweetController';
import { tokenValidation } from '../app/middlewares/tokenValidation';

const router = Router();


router.use(authMiddleware);


router.post('/', tokenValidation, TweetController.store);
router.get('/', TweetController.index);
router.put('/:id', TweetController.update);
router.delete('/:id', TweetController.delete);

export default router;
