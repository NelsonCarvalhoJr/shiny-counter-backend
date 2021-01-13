import { getRepository, In } from 'typeorm';

import Game from '../models/Game';
import Method from '../models/Method';

import AppError from '../errors/AppError';

interface IRequest {
  name: string;
  generation_number: number;
  method_id: string[];
}

class CreateGameService {
  public async execute({
    name,
    generation_number,
    method_id = [],
  }: IRequest): Promise<Game> {
    const gamesRepository = getRepository(Game);
    const methodsRepository = getRepository(Method);

    const findByName = await gamesRepository
      .createQueryBuilder()
      .where('LOWER(name) = LOWER(:name)', { name })
      .getOne();

    if (findByName) {
      throw new AppError('This game already exists');
    }

    const findMethods = await methodsRepository.find({
      where: {
        id: In(method_id),
      },
    });

    if (findMethods.length < method_id.length) {
      const methodIdsFound = findMethods.map(method => method.id);

      const invalidMethodIds = method_id.filter(method => {
        return (
          methodIdsFound.findIndex(methodFound => method === methodFound) < 0
        );
      });

      throw new AppError(
        `Method(s) ID(s) ${JSON.stringify(invalidMethodIds)
          .split('"')
          .join('')} doesn't exist(s)`,
        404,
      );
    }

    const game_methods = method_id.map(method => {
      return {
        method_id: method,
      };
    });

    const game = gamesRepository.create({
      name,
      game_methods,
      generation_number,
    });

    await gamesRepository.save(game);

    return game;
  }
}

export default CreateGameService;
