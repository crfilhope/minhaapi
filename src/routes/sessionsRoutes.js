import { Router } from 'express';
import authMiddleware from '../app/middlewares/auth';
import { loginValidation } from '../app/middlewares/userValidation';
import SessionController from '../app/controllers/SessionController';

const router = Router();



router.post('/', loginValidation, SessionController.store);


export default router;
