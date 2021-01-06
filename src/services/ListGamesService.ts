import { getRepository } from 'typeorm';

import Game from '../models/Game';

interface IRequest {
  name?: string;
}

class ListGamesService {
  public async execute({ name }: IRequest): Promise<Game[]> {
    const gamesRepository = getRepository(Game);

    const queryBuilder = await gamesRepository.createQueryBuilder('');

    if (name) {
      queryBuilder.where('LOWER(name) LIKE :name', {
        name: `%${name.toLowerCase()}%`,
      });
    }

    const games = await queryBuilder.getMany();

    return games;
  }
}

export default ListGamesService;
