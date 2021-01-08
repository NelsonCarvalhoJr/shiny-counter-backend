import { getRepository, FindOperator, Raw } from 'typeorm';

import Game from '../models/Game';

interface IRequest {
  name: string;
  generation_number: number;
}

interface IFindConditions {
  name: FindOperator<any>;
  generation_number?: number;
}

class ListGamesService {
  public async execute({
    name = '',
    generation_number,
  }: IRequest): Promise<Game[]> {
    const gamesRepository = getRepository(Game);

    const findOptions: IFindConditions = {
      name: Raw(alias => `LOWER(${alias}) Like '%${name.toLowerCase()}%'`),
      generation_number,
    };

    if (!generation_number) {
      delete findOptions.generation_number;
    }

    const games = await gamesRepository.find({
      where: findOptions,
      order: { generation_number: 'ASC' },
    });

    return games;
  }
}

export default ListGamesService;
