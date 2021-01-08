import { getRepository, FindOperator, Raw } from 'typeorm';

import Pokemon from '../models/Pokemon';

interface IRequest {
  name: string;
  pokedex_number: number;
}

interface IFindConditions {
  name: FindOperator<any>;
  pokedex_number?: number;
}

class ListPokemonsService {
  public async execute({
    name = '',
    pokedex_number,
  }: IRequest): Promise<Pokemon[]> {
    const pokemonsRepository = getRepository(Pokemon);

    const findOptions: IFindConditions = {
      name: Raw(alias => `LOWER(${alias}) Like '%${name.toLowerCase()}%'`),
      pokedex_number,
    };

    if (!pokedex_number) {
      delete findOptions.pokedex_number;
    }

    const pokemons = await pokemonsRepository.find({
      where: findOptions,
      order: { pokedex_number: 'ASC' },
    });

    return pokemons;
  }
}

export default ListPokemonsService;
