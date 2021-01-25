import { injectable, inject } from 'tsyringe';

import IGamesRepository from '../repositories/IGamesRepository';
import Game from '../infra/typeorm/entities/Game';

interface IRequest {
  name: string;
  generation_number: number;
}

@injectable()
class ListGamesService {
  constructor(
    @inject('GamesRepository')
    private gamesRepository: IGamesRepository,
  ) {}

  public async execute({ name, generation_number }: IRequest): Promise<Game[]> {
    const games = await this.gamesRepository.all({
      name,
      generation_number,
      order: { generation_number: 'ASC' },
    });

    return games;
  }
}

export default ListGamesService;
