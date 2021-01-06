import { getRepository } from 'typeorm';

import Pokemon from '../models/Pokemon';

interface IRequest {
  name?: string;
}

class ListPokemonsService {
  public async execute({ name }: IRequest): Promise<Pokemon[]> {
    const pokemonsRepository = getRepository(Pokemon);

    const queryBuilder = await pokemonsRepository.createQueryBuilder();

    if (name) {
      queryBuilder.where('LOWER(name) LIKE :name', {
        name: `%${name.toLowerCase()}%`,
      });
    }

    const pokemons = await queryBuilder.getMany();

    return pokemons;
  }
}

export default ListPokemonsService;
