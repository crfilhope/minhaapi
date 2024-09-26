import { Router } from 'express';
import UserController from '../app/controllers/UserController';
import loginRequired from '../app/middlewares/loginRequired';

const router = new Router();

router.post('/', UserController.store);
router.put('/:id', UserController.update);

router.get('/', UserController.index);
router.get('/', UserController.show);
router.delete('/delete/', UserController.delete);

export default router;

/*
index -> lista todos os usuarios -> GET
store/create -> cria um novo usuario -> POST
delete -> apaga um usuario -> DELETE
show -> mostra um usuario ->  GET
uptade -> atualiza um usuario - > PATCH OU PUT
*/