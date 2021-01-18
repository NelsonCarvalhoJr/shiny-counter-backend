import Router from 'express';

import GamesRepository from '@modules/games/infra/typeorm/repositories/GamesRepository';
import GamesMethodsRepository from '@modules/games/infra/typeorm/repositories/GamesMethodsRepository';
import MethodsRepository from '@modules/methods/infra/typeorm/repositories/MethodsRepository';

import CreateGameService from '@modules/games/services/CreateGameService';
import UpdateGameService from '@modules/games/services/UpdateGameService';
import DeleteGameService from '@modules/games/services/DeleteGameService';
import AddMethodsService from '@modules/games/services/AddMethodsService';
import RemoveMethodsService from '@modules/games/services/RemoveMethodsService';

const gamesRouter = Router();

gamesRouter.get('/', async (request, response) => {
  const { name, generation_number } = request.query;

  const parsedName = name as string;
  const parsedGenerationNumber = Number(generation_number);

  const gamesRepository = new GamesRepository();

  const games = await gamesRepository.all({
    name: parsedName,
    generation_number: parsedGenerationNumber,
    order: { generation_number: 'ASC' },
  });

  return response.json(games);
});

gamesRouter.post('/', async (request, response) => {
  const { name, method_id, generation_number } = request.body;

  const gamesRepository = new GamesRepository();
  const methodsRepository = new MethodsRepository();
  const createGame = new CreateGameService(gamesRepository, methodsRepository);

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

  const gamesRepository = new GamesRepository();
  const updateGame = new UpdateGameService(gamesRepository);

  const game = await updateGame.execute({ id, name, generation_number });

  return response.json(game);
});

gamesRouter.delete('/:id', async (request, response) => {
  const { id } = request.params;

  const gamesRepository = new GamesRepository();
  const deleteGame = new DeleteGameService(gamesRepository);

  await deleteGame.execute({ id });

  return response.status(204).send();
});

gamesRouter.post('/:game_id/add', async (request, response) => {
  const { game_id } = request.params;

  const { method_id } = request.body;

  const gamesRepository = new GamesRepository();
  const methodsRepository = new MethodsRepository();
  const gamesMethodsRepository = new GamesMethodsRepository();

  const addMethods = new AddMethodsService(
    gamesRepository,
    methodsRepository,
    gamesMethodsRepository,
  );

  const game = await addMethods.execute({ game_id, method_id });

  return response.json(game);
});

gamesRouter.post('/:game_id/remove', async (request, response) => {
  const { game_id } = request.params;

  const { method_id } = request.body;

  const gamesRepository = new GamesRepository();
  const methodsRepository = new MethodsRepository();
  const gamesMethodsRepository = new GamesMethodsRepository();

  const removeMethods = new RemoveMethodsService(
    gamesRepository,
    methodsRepository,
    gamesMethodsRepository,
  );

  const game = await removeMethods.execute({ game_id, method_id });

  return response.json(game);
});

export default gamesRouter;
