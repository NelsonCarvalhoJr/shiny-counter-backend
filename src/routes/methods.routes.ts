import Router from 'express';

import ListMethodsService from '../services/ListMethodsService';
import CreateMethodService from '../services/CreateMethodService';
import UpdateMethodService from '../services/UpdateMethodService';
import DeleteMethodService from '../services/DeleteMethodService';

const methodsRouter = Router();

methodsRouter.get('/', async (request, response) => {
  const { name, game_id } = request.query;

  const parsedName = name as string;
  const parsedGameId = game_id as string;

  const listMethod = new ListMethodsService();

  const methods = await listMethod.execute({
    name: parsedName,
    game_id: parsedGameId,
  });

  return response.json(methods);
});

methodsRouter.post('/', async (request, response) => {
  const { name } = request.body;

  const createMethod = new CreateMethodService();

  const method = await createMethod.execute({ name });

  return response.json(method);
});

methodsRouter.put('/:id', async (request, response) => {
  const { id } = request.params;

  const { name } = request.body;

  const updateMethod = new UpdateMethodService();

  const method = await updateMethod.execute({ id, name });

  return response.json(method);
});

methodsRouter.delete('/:id', async (request, response) => {
  const { id } = request.params;

  const deleteMethod = new DeleteMethodService();

  await deleteMethod.execute({ id });

  return response.status(204).send();
});

export default methodsRouter;
