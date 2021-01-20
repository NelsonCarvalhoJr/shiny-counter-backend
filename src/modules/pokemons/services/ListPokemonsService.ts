import { injectable, inject } from 'tsyringe';

import IPokemonsRepository from '../repositories/IPokemonsRepository';

import Pokemon from '../infra/typeorm/entities/Pokemon';

interface IRequest {
  name: string;
  pokedex_number: number;
}

@injectable()
class ListPokemonsService {
  constructor(
    @inject('PokemonsRepository')
    private pokemonsRepository: IPokemonsRepository,
  ) {}

  public async execute({ name, pokedex_number }: IRequest): Promise<Pokemon[]> {
    const pokemons = await this.pokemonsRepository.all({
      name,
      pokedex_number,
      order: {
        pokedex_number: 'ASC',
      },
    });

    return pokemons;
  }
}

export default ListPokemonsService;
