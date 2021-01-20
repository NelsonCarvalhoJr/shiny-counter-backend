import { Request, Response } from 'express';
import { container } from 'tsyringe';

import ListMethodsService from '@modules/methods/services/ListMethodsService';
import ShowMethodService from '@modules/methods/services/ShowMethodService';
import CreateMethodService from '@modules/methods/services/CreateMethodService';
import UpdateMethodService from '@modules/methods/services/UpdateMethodService';
import DeleteMethodService from '@modules/methods/services/DeleteMethodService';

class MethodsController {
  async index(request: Request, response: Response): Promise<Response> {
    const { name } = request.query;

    const parsedName = name as string;

    const listMethods = container.resolve(ListMethodsService);

    const methods = await listMethods.execute({
      name: parsedName,
    });

    return response.json(methods);
  }

  async show(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const showMethod = container.resolve(ShowMethodService);

    const method = await showMethod.execute({
      id,
    });

    return response.json(method);
  }

  async create(request: Request, response: Response): Promise<Response> {
    const { name } = request.body;

    const createMethod = container.resolve(CreateMethodService);

    const method = await createMethod.execute({ name });

    return response.json(method);
  }

  async update(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const { name } = request.body;

    const updateMethod = container.resolve(UpdateMethodService);

    const method = await updateMethod.execute({ id, name });

    return response.json(method);
  }

  async delete(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const deleteMethod = container.resolve(DeleteMethodService);

    await deleteMethod.execute({ id });

    return response.status(204).send();
  }
}

export default MethodsController;
