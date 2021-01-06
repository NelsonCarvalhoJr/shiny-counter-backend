import { getRepository } from 'typeorm';

import Game from '../models/Game';

interface IRequest {
  name: string;
  method_id?: string[];
}

class CreateGameService {
  public async execute({ name, method_id = [] }: IRequest): Promise<Game> {
    const gamesRepository = getRepository(Game);

    const findByName = await gamesRepository
      .createQueryBuilder()
      .where('LOWER(name) = LOWER(:name)', { name })
      .getOne();

    if (findByName) {
      throw Error('This game already exists');
    }

    const game_methods = method_id.map(method => {
      return {
        method_id: method,
      };
    });

    const game = gamesRepository.create({
      name,
      game_methods,
    });

    await gamesRepository.save(game);

    return game;
  }
}

export default CreateGameService;
