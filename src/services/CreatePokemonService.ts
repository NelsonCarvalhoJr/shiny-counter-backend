import { getRepository } from 'typeorm';

import Pokemon from '../models/Pokemon';

interface IRequest {
  name: string;
}

class CreatePokemonService {
  public async execute({ name }: IRequest): Promise<Pokemon> {
    const pokemonsRepository = getRepository(Pokemon);

    const findByName = await pokemonsRepository
      .createQueryBuilder()
      .where('LOWER(name) = LOWER(:name)', { name })
      .getOne();

    if (findByName) {
      throw Error('This pokémon already exists');
    }

    const pokemon = pokemonsRepository.create({ name });

    await pokemonsRepository.save(pokemon);

    return pokemon;
  }
}

export default CreatePokemonService;
