import Router from 'express';

import GamesController from '../controllers/GamesController';
import GamesMethodsController from '../controllers/GamesMethodsController';

const gamesRouter = Router();

const gamesController = new GamesController();
const gamesMethodsController = new GamesMethodsController();

gamesRouter.get('/', gamesController.index);
gamesRouter.get('/:id', gamesController.show);
gamesRouter.post('/', gamesController.create);
gamesRouter.put('/:id', gamesController.update);
gamesRouter.delete('/:id', gamesController.delete);

gamesRouter.post('/:game_id/add', gamesMethodsController.create);
gamesRouter.post('/:game_id/remove', gamesMethodsController.delete);

export default gamesRouter;
