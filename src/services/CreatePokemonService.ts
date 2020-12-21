import Pokemon from '../models/Pokemon';
import PokemonsRepository from '../repositories/PokemonsRepository';

interface IRequest {
  name: string;
}

class CreatePokemonService {
  private pokemonsRepository: PokemonsRepository;

  constructor(pokemonsRepository: PokemonsRepository) {
    this.pokemonsRepository = pokemonsRepository;
  }

  public execute({ name }: IRequest): Pokemon {
    const findByName = this.pokemonsRepository.findOneByName(name);

    if (findByName) {
      throw Error('This pokémon already exists');
    }

    const pokemon = this.pokemonsRepository.create({ name });

    return pokemon;
  }
}

export default CreatePokemonService;
