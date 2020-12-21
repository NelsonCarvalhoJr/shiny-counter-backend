import PokemonsRepository from '../repositories/PokemonsRepository';

interface IRequest {
  id: string;
}

class DeletePokemonService {
  private pokemonsRepository: PokemonsRepository;

  constructor(pokemonsRepository: PokemonsRepository) {
    this.pokemonsRepository = pokemonsRepository;
  }

  public execute({ id }: IRequest): void {
    const pokemon = this.pokemonsRepository.findById(id);

    if (!pokemon) {
      throw Error("This pokémon ID doesn't exists");
    }

    this.pokemonsRepository.delete(id);
  }
}

export default DeletePokemonService;
