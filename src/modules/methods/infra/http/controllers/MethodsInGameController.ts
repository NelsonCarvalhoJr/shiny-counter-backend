import { Request, Response } from 'express';
import { container } from 'tsyringe';

import ListMethodsByGameIdService from '@modules/methods/services/ListMethodsByGameIdService';

class MethodsInGameController {
  async index(request: Request, response: Response): Promise<Response> {
    const { game_id } = request.params;
    const { name } = request.query;

    const parsedName = name as string;

    const listMethodsByGameId = container.resolve(ListMethodsByGameIdService);

    const methods = await listMethodsByGameId.execute({
      name: parsedName,
      game_id,
    });

    return response.json(methods);
  }
}

export default MethodsInGameController;
