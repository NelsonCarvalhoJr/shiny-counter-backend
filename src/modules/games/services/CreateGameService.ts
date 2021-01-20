import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import IMethodsRepository from '@modules/methods/repositories/IMethodsRepository';
import IGamesRepository from '../repositories/IGamesRepository';
import Game from '../infra/typeorm/entities/Game';

interface IRequest {
  name: string;
  generation_number: number;
  method_id: string[];
}

@injectable()
class CreateGameService {
  constructor(
    @inject('GamesRepository')
    private gamesRepository: IGamesRepository,
    @inject('MethodsRepository')
    private methodsRepository: IMethodsRepository,
  ) {}

  public async execute({
    name,
    generation_number,
    method_id = [],
  }: IRequest): Promise<Game> {
    const findByName = await this.gamesRepository.findByName(name);

    if (findByName) {
      throw new AppError('This game already exists');
    }

    const findMethods = await this.methodsRepository.findByIds(method_id);

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

    const game = await this.gamesRepository.create({
      name,
      game_methods,
      generation_number,
    });

    return game;
  }
}

export default CreateGameService;
