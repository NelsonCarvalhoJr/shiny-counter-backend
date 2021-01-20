import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import IGamesRepository from '../repositories/IGamesRepository';
import Game from '../infra/typeorm/entities/Game';

interface IRequest {
  id: string;
  name: string;
  generation_number: number;
}

@injectable()
class UpdateGameService {
  constructor(
    @inject('GamesRepository')
    private gamesRepository: IGamesRepository,
  ) {}

  public async execute({
    id,
    name,
    generation_number,
  }: IRequest): Promise<Game> {
    const game = await this.gamesRepository.findById(id);

    if (!game) {
      throw new AppError("This game ID doesn't exists", 404);
    }

    const findByName = await this.gamesRepository.findByName(name);

    if (findByName && findByName.id !== id) {
      throw new AppError('This game already exists');
    }

    game.name = name;
    game.generation_number = generation_number;

    await this.gamesRepository.update(game);

    return game;
  }
}

export default UpdateGameService;
