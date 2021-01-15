import Router from 'express';

import ListLocationsService from '@modules/locations/services/ListLocationsService';
import CreateLocationService from '@modules/locations/services/CreateLocationService';
import UpdateLocationService from '@modules/locations/services/UpdateLocationService';
import DeleteLocationService from '@modules/locations/services/DeleteLocationService';

const locationsRouter = Router();

locationsRouter.get('/', async (request, response) => {
  const { name } = request.query;

  const parsedName = name as string;

  const listLocations = new ListLocationsService();

  const location = await listLocations.execute({ name: parsedName });

  return response.json(location);
});

locationsRouter.post('/', async (request, response) => {
  const { name } = request.body;

  const createLocation = new CreateLocationService();

  const location = await createLocation.execute({ name });

  return response.json(location);
});

locationsRouter.put('/:id', async (request, response) => {
  const { id } = request.params;

  const { name } = request.body;

  const updateLocation = new UpdateLocationService();

  const location = await updateLocation.execute({ id, name });

  return response.json(location);
});

locationsRouter.delete('/:id', async (request, response) => {
  const { id } = request.params;

  const deleteLocation = new DeleteLocationService();

  await deleteLocation.execute({ id });

  return response.status(204).send();
});

export default locationsRouter;
