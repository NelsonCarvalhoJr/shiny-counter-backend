import { Request, Response } from 'express';
import { container } from 'tsyringe';

import AddMethodsService from '@modules/games/services/AddMethodsService';
import RemoveMethodsService from '@modules/games/services/RemoveMethodsService';

class GamesMethodsController {
  async create(request: Request, response: Response): Promise<Response> {
    const { game_id } = request.params;

    const { method_id } = request.body;

    const addMethods = container.resolve(AddMethodsService);

    const game = await addMethods.execute({ game_id, method_id });

    return response.json(game);
  }

  async delete(request: Request, response: Response): Promise<Response> {
    const { game_id } = request.params;

    const { method_id } = request.body;

    const removeMethods = container.resolve(RemoveMethodsService);

    const game = await removeMethods.execute({ game_id, method_id });

    return response.json(game);
  }
}

export default GamesMethodsController;
