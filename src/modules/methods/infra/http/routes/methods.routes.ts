import Router from 'express';

import MethodsRepository from '@modules/methods/infra/typeorm/repositories/MethodsRepository';

import CreateMethodService from '@modules/methods/services/CreateMethodService';
import UpdateMethodService from '@modules/methods/services/UpdateMethodService';
import DeleteMethodService from '@modules/methods/services/DeleteMethodService';

const methodsRouter = Router();

methodsRouter.get('/', async (request, response) => {
  const { name } = request.query;

  const parsedName = name as string;

  const methodsRepository = new MethodsRepository();

  const methods = await methodsRepository.all({
    name: parsedName,
    order: {
      name: 'ASC',
    },
  });

  return response.json(methods);
});

methodsRouter.get('/:game_id', async (request, response) => {
  const { game_id } = request.params;
  const { name } = request.query;

  const parsedName = name as string;

  const methodsRepository = new MethodsRepository();

  const methods = await methodsRepository.allByGameId({
    name: parsedName,
    game_id,
  });

  return response.json(methods);
});

methodsRouter.post('/', async (request, response) => {
  const { name } = request.body;

  const methodsRepository = new MethodsRepository();
  const createMethod = new CreateMethodService(methodsRepository);

  const method = await createMethod.execute({ name });

  return response.json(method);
});

methodsRouter.put('/:id', async (request, response) => {
  const { id } = request.params;

  const { name } = request.body;

  const methodsRepository = new MethodsRepository();
  const updateMethod = new UpdateMethodService(methodsRepository);

  const method = await updateMethod.execute({ id, name });

  return response.json(method);
});

methodsRouter.delete('/:id', async (request, response) => {
  const { id } = request.params;

  const methodsRepository = new MethodsRepository();
  const deleteMethod = new DeleteMethodService(methodsRepository);

  await deleteMethod.execute({ id });

  return response.status(204).send();
});

export default methodsRouter;
