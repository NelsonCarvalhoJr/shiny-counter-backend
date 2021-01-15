import { getRepository } from 'typeorm';

import Method from '../infra/typeorm/entities/Method';

interface IRequest {
  name: string;
  game_id: string;
}

class ListMethodsService {
  public async execute({ name = '', game_id }: IRequest): Promise<Method[]> {
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

    const methods = await queryBuilder.getMany();

    return methods;
  }
}

export default ListMethodsService;
