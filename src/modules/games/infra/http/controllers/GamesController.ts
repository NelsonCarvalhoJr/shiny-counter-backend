import { Request, Response } from 'express';
import { container } from 'tsyringe';

import ListGamesService from '@modules/games/services/ListGamesService';
import ShowGameService from '@modules/games/services/ShowGameService';
import CreateGameService from '@modules/games/services/CreateGameService';
import UpdateGameService from '@modules/games/services/UpdateGameService';
import DeleteGameService from '@modules/games/services/DeleteGameService';

class GamesController {
  async index(request: Request, response: Response): Promise<Response> {
    const { name, generation_number } = request.query;

    const parsedName = name as string;
    const parsedGenerationNumber = Number(generation_number);

    const listGames = container.resolve(ListGamesService);

    const games = await listGames.execute({
      name: parsedName,
      generation_number: parsedGenerationNumber,
    });

    return response.json(games);
  }

  async show(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const showGame = container.resolve(ShowGameService);

    const games = await showGame.execute({
      id,
    });

    return response.json(games);
  }

  async create(request: Request, response: Response): Promise<Response> {
    const { name, method_id, generation_number } = request.body;

    const createGame = container.resolve(CreateGameService);

    const game = await createGame.execute({
      name,
      method_id,
      generation_number,
    });

    return response.json(game);
  }

  async update(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const { name, generation_number } = request.body;

    const updateGame = container.resolve(UpdateGameService);

    const game = await updateGame.execute({ id, name, generation_number });

    return response.json(game);
  }

  async delete(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const deleteGame = container.resolve(DeleteGameService);

    await deleteGame.execute({ id });

    return response.status(204).send();
  }
}

export default GamesController;
