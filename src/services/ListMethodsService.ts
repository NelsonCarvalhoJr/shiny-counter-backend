import { getRepository } from 'typeorm';

import Method from '../models/Method';

interface IRequest {
  name?: string;
  game_id?: string;
}

class ListMethodsService {
  public async execute({ name, game_id }: IRequest): Promise<Method[]> {
    const methodsRepository = getRepository(Method);

    const queryBuilder = await methodsRepository.createQueryBuilder('m');

    if (name) {
      queryBuilder.where('LOWER(m.name) LIKE :name', {
        name: `%${name.toLowerCase()}%`,
      });
    }

    if (game_id) {
      queryBuilder.leftJoin('games_methods', 'gm', 'gm.method_id = m.id');
      queryBuilder.where('gm.game_id = :game_id', { game_id });
    }

    const method = await queryBuilder.getMany();

    return method;
  }
}

export default ListMethodsService;
