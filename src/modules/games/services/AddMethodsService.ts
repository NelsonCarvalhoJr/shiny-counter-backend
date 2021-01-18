import AppError from '@shared/errors/AppError';

import IMethodsRepository from '@modules/methods/repositories/IMethodsRepository';
import IGamesRepository from '../repositories/IGamesRepository';
import IGamesMethodsRepository from '../repositories/IGamesMethodsRepository';

import Game from '../infra/typeorm/entities/Game';

interface IRequest {
  game_id: string;
  method_id: string[];
}

class AddMethodsService {
  constructor(
    private gamesRepository: IGamesRepository,
    private methodsRepositorty: IMethodsRepository,
    private gamesMethodsRepository: IGamesMethodsRepository,
  ) {}

  public async execute({ game_id, method_id }: IRequest): Promise<Game> {
    const game = await this.gamesRepository.findById(game_id);

    if (!game) {
      throw new AppError("This game ID doesn't exists", 404);
    }

    const methods = await this.methodsRepositorty.findByIds(method_id);

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

    const methodsInGame = await this.gamesMethodsRepository.all({
      method_id,
      game_id,
    });

    if (methodsInGame.length > 0) {
      const methodIdsFound = methodsInGame.map(method => method.method_id);

      throw new AppError(
        `Method(s) ID(s) ${JSON.stringify(methodIdsFound)
          .split('"')
          .join('')} already exist(s) in this game`,
      );
    }

    const gamesMethods = methods.map(method => {
      return this.gamesMethodsRepository.create({
        game_id: game?.id,
        method_id: method.id,
      });
    });

    const savedMethods = await Promise.all(gamesMethods);

    game.game_methods = savedMethods;

    return game;
  }
}

export default AddMethodsService;
