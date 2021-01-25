import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import IGamesRepository from '../repositories/IGamesRepository';
import Game from '../infra/typeorm/entities/Game';

interface IRequest {
  id: string;
}

@injectable()
class ShowGameService {
  constructor(
    @inject('GamesRepository')
    private gamesRepository: IGamesRepository,
  ) {}

  public async execute({ id }: IRequest): Promise<Game> {
    const game = await this.gamesRepository.findById(id);

    if (!game) {
      throw new AppError('Game not found', 404);
    }

    return game;
  }
}

export default ShowGameService;
