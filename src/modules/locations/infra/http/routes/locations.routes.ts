import Router from 'express';

import LocationsRepository from '@modules/locations/infra/typeorm/repositories/LocationsRepository';

import CreateLocationService from '@modules/locations/services/CreateLocationService';
import UpdateLocationService from '@modules/locations/services/UpdateLocationService';
import DeleteLocationService from '@modules/locations/services/DeleteLocationService';

const locationsRouter = Router();

locationsRouter.get('/', async (request, response) => {
  const { name } = request.query;

  const parsedName = name as string;

  const locationsRepository = new LocationsRepository();

  const location = await locationsRepository.all({
    name: parsedName,
    order: { name: 'ASC' },
  });

  return response.json(location);
});

locationsRouter.post('/', async (request, response) => {
  const { name } = request.body;

  const locationsRepository = new LocationsRepository();
  const createLocation = new CreateLocationService(locationsRepository);

  const location = await createLocation.execute({ name });

  return response.json(location);
});

locationsRouter.put('/:id', async (request, response) => {
  const { id } = request.params;

  const { name } = request.body;

  const locationsRepository = new LocationsRepository();
  const updateLocation = new UpdateLocationService(locationsRepository);

  const location = await updateLocation.execute({ id, name });

  return response.json(location);
});

locationsRouter.delete('/:id', async (request, response) => {
  const { id } = request.params;

  const locationsRepository = new LocationsRepository();
  const deleteLocation = new DeleteLocationService(locationsRepository);

  await deleteLocation.execute({ id });

  return response.status(204).send();
});

export default locationsRouter;
