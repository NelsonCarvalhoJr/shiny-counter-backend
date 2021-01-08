import { getRepository } from 'typeorm';

import Pokemon from '../models/Pokemon';

interface IRequest {
  name: string;
  pokedex_number: number;
}

class ListPokemonsService {
  public async execute({ name, pokedex_number }: IRequest): Promise<Pokemon[]> {
    const pokemonsRepository = getRepository(Pokemon);

    const queryBuilder = await pokemonsRepository.createQueryBuilder();

    if (name) {
      queryBuilder.where('LOWER(name) LIKE :name', {
        name: `%${name.toLowerCase()}%`,
      });
    }

    if (pokedex_number) {
      queryBuilder.where('pokedex_number = :pokedex_number', {
        pokedex_number,
      });
    }

    queryBuilder.orderBy('pokedex_number');

    const pokemons = await queryBuilder.getMany();

    return pokemons;
  }
}

export default ListPokemonsService;
