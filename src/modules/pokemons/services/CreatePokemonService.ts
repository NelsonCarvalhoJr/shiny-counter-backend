import AppError from '@shared/errors/AppError';

import IPokemonsRepository from '../repositories/IPokemonsRepository';
import Pokemon from '../infra/typeorm/entities/Pokemon';

interface IRequest {
  name: string;
  pokedex_number: number;
}

class CreatePokemonService {
  constructor(private pokemonsRepository: IPokemonsRepository) {}

  public async execute({ name, pokedex_number }: IRequest): Promise<Pokemon> {
    const findByName = await this.pokemonsRepository.findByName(name);

    if (findByName) {
      throw new AppError('This pokémon already exists');
    }

    const findByPokedexNumber = await this.pokemonsRepository.findByPokedexNumber(
      pokedex_number,
    );

    if (findByPokedexNumber) {
      throw new AppError('This pokédex number already exists');
    }

    const pokemon = await this.pokemonsRepository.create({
      name,
      pokedex_number,
    });

    return pokemon;
  }
}

export default CreatePokemonService;
