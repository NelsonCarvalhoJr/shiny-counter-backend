import { getRepository } from 'typeorm';

import Pokemon from '../models/Pokemon';

interface IRequest {
  name: string;
  pokedex_number: number;
}

class CreatePokemonService {
  public async execute({ name, pokedex_number }: IRequest): Promise<Pokemon> {
    const pokemonsRepository = getRepository(Pokemon);

    const findByName = await pokemonsRepository
      .createQueryBuilder()
      .where('LOWER(name) = LOWER(:name)', { name })
      .getOne();

    if (findByName) {
      throw Error('This pokémon already exists');
    }

    const findByPokedexNumber = await pokemonsRepository.findOne({
      where: {
        pokedex_number,
      },
    });

    if (findByPokedexNumber) {
      throw Error('This pokédex number already exists');
    }

    const pokemon = pokemonsRepository.create({ name, pokedex_number });

    await pokemonsRepository.save(pokemon);

    return pokemon;
  }
}

export default CreatePokemonService;
