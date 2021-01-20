import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import IPokemonsRepository from '../repositories/IPokemonsRepository';
import Pokemon from '../infra/typeorm/entities/Pokemon';

interface IRequest {
  id: string;
  name: string;
  pokedex_number: number;
}

@injectable()
class UpdatePokemonService {
  constructor(
    @inject('PokemonsRepository')
    private pokemonsRepository: IPokemonsRepository,
  ) {}

  public async execute({
    id,
    name,
    pokedex_number,
  }: IRequest): Promise<Pokemon> {
    const pokemon = await this.pokemonsRepository.findById(id);

    if (!pokemon) {
      throw new AppError("This pokémon ID doesn't exists", 404);
    }

    const findByName = await this.pokemonsRepository.findByName(name);

    if (findByName && findByName.id !== id) {
      throw new AppError('This pokémon already exists');
    }

    const findByPokedexNumber = await this.pokemonsRepository.findByPokedexNumber(
      pokedex_number,
    );

    if (findByPokedexNumber && findByPokedexNumber.id !== id) {
      throw new AppError('This pokédex number already exists');
    }

    pokemon.name = name;
    pokemon.pokedex_number = pokedex_number;

    await this.pokemonsRepository.update(pokemon);

    return pokemon;
  }
}

export default UpdatePokemonService;
