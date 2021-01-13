import { getRepository } from 'typeorm';

import Pokemon from '../models/Pokemon';

import AppError from '../errors/AppError';

interface IRequest {
  id: string;
  name: string;
  pokedex_number: number;
}

class UpdatePokemonService {
  public async execute({
    id,
    name,
    pokedex_number,
  }: IRequest): Promise<Pokemon> {
    const pokemonsRepository = getRepository(Pokemon);

    const pokemon = await pokemonsRepository.findOne(id);

    if (!pokemon) {
      throw new AppError("This pokémon ID doesn't exists", 404);
    }

    const findByName = await pokemonsRepository
      .createQueryBuilder()
      .where('LOWER(name) = LOWER(:name)', { name })
      .getOne();

    if (findByName && findByName.id !== id) {
      throw new AppError('This pokémon already exists');
    }

    const findByPokedexNumber = await pokemonsRepository.findOne({
      where: {
        pokedex_number,
      },
    });

    if (findByPokedexNumber && findByPokedexNumber.id !== id) {
      throw new AppError('This pokédex number already exists');
    }

    pokemon.name = name;
    pokemon.pokedex_number = pokedex_number;

    await pokemonsRepository.save(pokemon);

    return pokemon;
  }
}

export default UpdatePokemonService;
