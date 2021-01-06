import Router from 'express';

import ListLocationsService from '../services/ListLocationsService';
import CreateLocationService from '../services/CreateLocationService';
import UpdateLocationService from '../services/UpdateLocationService';
import DeleteLocationService from '../services/DeleteLocationService';

const locationsRouter = Router();

locationsRouter.get('/', async (request, response) => {
  const { name } = request.query;

  const parsedName = name as string;

  const listLocations = new ListLocationsService();

  const location = await listLocations.execute({ name: parsedName });

  return response.json(location);
});

locationsRouter.post('/', async (request, response) => {
  try {
    const { name } = request.body;

    const createLocation = new CreateLocationService();

    const location = await createLocation.execute({ name });

    return response.json(location);
  } catch (error) {
    return response.status(400).json({ error: error.message });
  }
});

locationsRouter.put('/:id', async (request, response) => {
  try {
    const { id } = request.params;

    const { name } = request.body;

    const updateLocation = new UpdateLocationService();

    const location = await updateLocation.execute({ id, name });

    return response.json(location);
  } catch (error) {
    return response.status(400).json({ error: error.message });
  }
});

locationsRouter.delete('/:id', async (request, response) => {
  try {
    const { id } = request.params;

    const deleteLocation = new DeleteLocationService();

    await deleteLocation.execute({ id });

    return response.status(204).send();
  } catch (error) {
    return response.status(400).json({ error: error.message });
  }
});

export default locationsRouter;
