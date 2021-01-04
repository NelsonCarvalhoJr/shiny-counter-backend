import { getRepository } from 'typeorm';

import Pokemon from '../models/Pokemon';

interface IRequest {
  id: string;
  name: string;
}

class UpdatePokemonService {
  public async execute({ id, name }: IRequest): Promise<Pokemon> {
    const pokemonsRepository = getRepository(Pokemon);

    const pokemon = await pokemonsRepository.findOne({
      where: {
        id,
      },
    });

    if (!pokemon) {
      throw Error("This pokémon ID doesn't exists");
    }

    const findByName = await pokemonsRepository
      .createQueryBuilder()
      .where('LOWER(name) = LOWER(:name)', { name })
      .getOne();

    if (findByName && findByName.id !== id) {
      throw Error('This pokémon already exists');
    }

    pokemon.name = name;

    await pokemonsRepository.save(pokemon);

    return pokemon;
  }
}

export default UpdatePokemonService;
