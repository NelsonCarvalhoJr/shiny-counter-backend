import Router from 'express';

import ListGamesService from '../services/ListGamesService';
import CreateGameService from '../services/CreateGameService';
import UpdateGameService from '../services/UpdateGameService';
import DeleteGameService from '../services/DeleteGameService';
import AddMethodsService from '../services/AddMethodsService';
import RemoveMethodsService from '../services/RemoveMethodsService';

const gamesRouter = Router();

gamesRouter.get('/', async (request, response) => {
  const { name } = request.query;

  const parsedName = name as string;

  const listGames = new ListGamesService();

  const games = await listGames.execute({ name: parsedName });

  return response.json(games);
});

gamesRouter.post('/', async (request, response) => {
  try {
    const { name, method_id } = request.body;

    const createGame = new CreateGameService();

    const game = await createGame.execute({ name, method_id });

    return response.json(game);
  } catch (error) {
    return response.status(400).json({ error: error.message });
  }
});

gamesRouter.put('/:id', async (request, response) => {
  try {
    const { id } = request.params;

    const { name } = request.body;

    const updateGame = new UpdateGameService();

    const game = await updateGame.execute({ id, name });

    return response.json(game);
  } catch (error) {
    return response.status(400).json({ error: error.message });
  }
});

gamesRouter.delete('/:id', async (request, response) => {
  try {
    const { id } = request.params;

    const deleteGame = new DeleteGameService();

    await deleteGame.execute({ id });

    return response.status(204).send();
  } catch (error) {
    return response.status(400).json({ error: error.message });
  }
});

gamesRouter.post('/:id/add', async (request, response) => {
  try {
    const { id } = request.params;

    const { method_id } = request.body;

    const addMethods = new AddMethodsService();

    const game = await addMethods.execute({ id, method_id });

    return response.json(game);
  } catch (error) {
    return response.status(400).json({ error: error.message });
  }
});

gamesRouter.post('/:id/remove', async (request, response) => {
  try {
    const { id } = request.params;

    const { method_id } = request.body;

    const removeMethods = new RemoveMethodsService();

    const game = await removeMethods.execute({ id, method_id });

    return response.json(game);
  } catch (error) {
    return response.status(400).json({ error: error.message });
  }
});

export default gamesRouter;
