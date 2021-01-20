import { Request, Response } from 'express';
import { container } from 'tsyringe';

import ListLocationsService from '@modules/locations/services/ListLocationsService';
import ShowLocationService from '@modules/locations/services/ShowLocationService';
import CreateLocationService from '@modules/locations/services/CreateLocationService';
import UpdateLocationService from '@modules/locations/services/UpdateLocationService';
import DeleteLocationService from '@modules/locations/services/DeleteLocationService';

class LocationsController {
  async index(request: Request, response: Response): Promise<Response> {
    const { name } = request.query;

    const parsedName = name as string;

    const listLocations = container.resolve(ListLocationsService);

    const location = await listLocations.execute({
      name: parsedName,
    });

    return response.json(location);
  }

  async show(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const showLocation = container.resolve(ShowLocationService);

    const location = await showLocation.execute({
      id,
    });

    return response.json(location);
  }

  async create(request: Request, response: Response): Promise<Response> {
    const { name } = request.body;

    const createLocation = container.resolve(CreateLocationService);

    const location = await createLocation.execute({ name });

    return response.json(location);
  }

  async update(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const { name } = request.body;

    const updateLocation = container.resolve(UpdateLocationService);

    const location = await updateLocation.execute({ id, name });

    return response.json(location);
  }

  async delete(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const deleteLocation = container.resolve(DeleteLocationService);

    await deleteLocation.execute({ id });

    return response.status(204).send();
  }
}

export default LocationsController;
