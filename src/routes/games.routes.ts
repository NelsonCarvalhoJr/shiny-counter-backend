import Router from 'express';

import ListGamesService from '../services/ListGamesService';
import CreateGameService from '../services/CreateGameService';
import UpdateGameService from '../services/UpdateGameService';
import DeleteGameService from '../services/DeleteGameService';
import AddMethodsService from '../services/AddMethodsService';
import RemoveMethodsService from '../services/RemoveMethodsService';

const gamesRouter = Router();

gamesRouter.get('/', async (request, response) => {
  const { name, generation_number } = request.query;

  const parsedName = name as string;
  const parsedGenerationNumber = Number(generation_number);

  const listGames = new ListGamesService();

  const games = await listGames.execute({
    name: parsedName,
    generation_number: parsedGenerationNumber,
  });

  return response.json(games);
});

gamesRouter.post('/', async (request, response) => {
  const { name, method_id, generation_number } = request.body;

  const createGame = new CreateGameService();

  const game = await createGame.execute({
    name,
    method_id,
    generation_number,
  });

  return response.json(game);
});

gamesRouter.put('/:id', async (request, response) => {
  const { id } = request.params;

  const { name, generation_number } = request.body;

  const updateGame = new UpdateGameService();

  const game = await updateGame.execute({ id, name, generation_number });

  return response.json(game);
});

gamesRouter.delete('/:id', async (request, response) => {
  const { id } = request.params;

  const deleteGame = new DeleteGameService();

  await deleteGame.execute({ id });

  return response.status(204).send();
});

gamesRouter.post('/:id/add', async (request, response) => {
  const { id } = request.params;

  const { method_id } = request.body;

  const addMethods = new AddMethodsService();

  const game = await addMethods.execute({ id, method_id });

  return response.json(game);
});

gamesRouter.post('/:id/remove', async (request, response) => {
  const { id } = request.params;

  const { method_id } = request.body;

  const removeMethods = new RemoveMethodsService();

  const game = await removeMethods.execute({ id, method_id });

  return response.json(game);
});

export default gamesRouter;
