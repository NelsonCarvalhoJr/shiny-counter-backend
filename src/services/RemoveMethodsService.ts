import { getRepository, In } from 'typeorm';

import Game from '../models/Game';
import Method from '../models/Method';
import GamesMethods from '../models/GamesMethods';

interface IRequest {
  id: string;
  method_id: string[];
}

class RemoveMethodsService {
  public async execute({ id, method_id }: IRequest): Promise<Game> {
    const gamesRepository = getRepository(Game);
    const methodsRepositorty = getRepository(Method);
    const gamesMethodsRepository = getRepository(GamesMethods);

    let game = await gamesRepository.findOne(id);

    if (!game) {
      throw Error("This game ID doesn't exists");
    }

    const methods = await methodsRepositorty.findByIds(method_id);

    if (methods.length < method_id.length) {
      const methodIdsFound = methods.map(method => method.id);

      const invalidMethodIds = method_id.filter(method => {
        return (
          methodIdsFound.findIndex(methodFound => method === methodFound) < 0
        );
      });

      throw Error(
        `Method(s) ID(s) ${JSON.stringify(invalidMethodIds)
          .split('"')
          .join('')} doesn't exist(s)`,
      );
    }

    const methodsInGame = await gamesMethodsRepository.find({
      where: {
        method_id: In(method_id),
        game_id: id,
      },
    });

    if (methodsInGame.length < method_id.length) {
      const methodIdsFound = methodsInGame.map(method => method.method_id);

      const invalidMethods = method_id.filter(method => {
        return (
          methodIdsFound.findIndex(methodFound => methodFound === method) < 0
        );
      });

      throw Error(
        `Method(s) ID(s) ${JSON.stringify(invalidMethods)
          .split('"')
          .join('')} doesn't exist(s) in this game`,
      );
    }

    const gamesMethods = methodsInGame.map(game_method => {
      return gamesMethodsRepository.delete(game_method.id);
    });

    await Promise.all(gamesMethods);

    game = await gamesRepository.findOne(id);

    return game as Game;
  }
}

export default RemoveMethodsService;
