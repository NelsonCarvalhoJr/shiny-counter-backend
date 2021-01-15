import { getRepository, In } from 'typeorm';

import AppError from '@shared/errors/AppError';

import Method from '@modules/methods/infra/typeorm/entities/Method';
import Game from '../infra/typeorm/entities/Game';
import GamesMethods from '../infra/typeorm/entities/GamesMethods';

interface IRequest {
  id: string;
  method_id: string[];
}

class AddMethodsService {
  public async execute({ id, method_id }: IRequest): Promise<Game> {
    const gamesRepository = getRepository(Game);
    const methodsRepositorty = getRepository(Method);
    const gamesMethodsRepository = getRepository(GamesMethods);

    let game = await gamesRepository.findOne(id);

    if (!game) {
      throw new AppError("This game ID doesn't exists", 404);
    }

    const methods = await methodsRepositorty.findByIds(method_id);

    if (methods.length < method_id.length) {
      const methodIdsFound = methods.map(method => method.id);

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

    const methodsInGame = await gamesMethodsRepository.find({
      where: {
        method_id: In(method_id),
        game_id: id,
      },
    });

    if (methodsInGame.length > 0) {
      const methodIdsFound = methodsInGame.map(method => method.method_id);

      throw new AppError(
        `Method(s) ID(s) ${JSON.stringify(methodIdsFound)
          .split('"')
          .join('')} already exist(s) in this game`,
      );
    }

    const gamesMethods = methods
      .map(method => {
        return gamesMethodsRepository.create({
          game_id: game?.id,
          method_id: method.id,
        });
      })
      .map(gameMethod => gamesMethodsRepository.save(gameMethod));

    await Promise.all(gamesMethods);

    game = await gamesRepository.findOne(id);

    return game as Game;
  }
}

export default AddMethodsService;