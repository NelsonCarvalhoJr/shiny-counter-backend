import Router from 'express';

import MethodsController from '../controllers/MethodsController';
import MethodsInGameController from '../controllers/MethodsInGameController';

const methodsRouter = Router();

const methodsController = new MethodsController();
const methodsInGameController = new MethodsInGameController();

methodsRouter.get('/', methodsController.index);
methodsRouter.get('/:id', methodsController.show);
methodsRouter.post('/', methodsController.create);
methodsRouter.put('/:id', methodsController.update);
methodsRouter.delete('/:id', methodsController.delete);

methodsRouter.get('/game/:game_id', methodsInGameController.index);

export default methodsRouter;
