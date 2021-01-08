import { getRepository } from 'typeorm';

import Game from '../models/Game';

interface IRequest {
  name: string;
  generation_number: number;
}

class ListGamesService {
  public async execute({ name, generation_number }: IRequest): Promise<Game[]> {
    const gamesRepository = getRepository(Game);

    const queryBuilder = await gamesRepository.createQueryBuilder('');

    if (name) {
      queryBuilder.where('LOWER(name) LIKE :name', {
        name: `%${name.toLowerCase()}%`,
      });
    }

    if (generation_number) {
      queryBuilder.where('generation_number = :generation_number', {
        generation_number,
      });
    }

    queryBuilder.orderBy('generation_number');

    const games = await queryBuilder.getMany();

    return games;
  }
}

export default ListGamesService;
