import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import IMethodsRepository from '@modules/methods/repositories/IMethodsRepository';
import IGamesRepository from '../repositories/IGamesRepository';
import Game from '../infra/typeorm/entities/Game';

interface IRequest {
  game_id: string;
  method_id: string[];
}

@injectable()
class RemoveMethodsService {
  constructor(
    @inject('GamesRepository')
    private gamesRepository: IGamesRepository,

    @inject('MethodsRepository')
    private methodsRepositorty: IMethodsRepository, // @inject('GamesMethodsRepository') // private gamesMethodsRepository: IGamesMethodsRepository,
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

      if (invalidMethodIds.length) {
        throw new AppError(
          `Method(s) ID(s) ${JSON.stringify(invalidMethodIds)
            .split('"')
            .join('')} doesn't exist(s)`,
          404,
        );
      }

      const orderedMethods = method_id.sort();

      const repeatMethods: string[] = [];

      orderedMethods.forEach((method, index) => {
        if (index) {
          if (orderedMethods[index - 1] === method) {
            repeatMethods.push(method);
          }
        }
      });

      throw new AppError(
        `Method(s) ID(s) ${JSON.stringify(
          repeatMethods,
        )} are repeated in request`,
      );
    }

    const methodsInGame = game.game_methods;

    const methodIdsFound = methodsInGame.map(method => method.method_id);

    const invalidMethods = method_id.filter(method => {
      return (
        methodIdsFound.findIndex(methodFound => methodFound === method) < 0
      );
    });

    if (invalidMethods.length) {
      throw new AppError(
        `Method(s) ID(s) ${JSON.stringify(invalidMethods)
          .split('"')
          .join('')} doesn't exist(s) in this game`,
        404,
      );
    }

    const savedGame = await this.gamesRepository.removeGamesMethods(
      game,
      method_id,
    );

    return savedGame;
  }
}

export default RemoveMethodsService;
