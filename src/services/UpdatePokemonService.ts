import Pokemon from '../models/Pokemon';
import PokemonsRepository from '../repositories/PokemonsRepository';

interface IRequest {
  id: string;
  name: string;
}

class UpdatePokemonService {
  private pokemonsRepository: PokemonsRepository;

  constructor(pokemonsRepository: PokemonsRepository) {
    this.pokemonsRepository = pokemonsRepository;
  }

  public execute({ id, name }: IRequest): Pokemon {
    const pokemon = this.pokemonsRepository.findById(id);

    if (!pokemon) {
      throw Error("This pokémon ID doesn't exists");
    }

    const pokemonFoundByName = this.pokemonsRepository.findOneByName(name);

    if (pokemonFoundByName && pokemonFoundByName.id !== id) {
      throw Error('This pokémon already exists');
    }

    const updatedPokemon = this.pokemonsRepository.update({ id, name });

    return updatedPokemon;
  }
}

export default UpdatePokemonService;
