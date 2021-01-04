import { getRepository } from 'typeorm';

import Pokemon from '../models/Pokemon';

interface IRequest {
  id: string;
}

class DeletePokemonService {
  public async execute({ id }: IRequest): Promise<void> {
    const pokemonsRepository = getRepository(Pokemon);

    const pokemon = await pokemonsRepository.findOne({
      where: {
        id,
      },
    });

    if (!pokemon) {
      throw Error("This pokémon ID doesn't exists");
    }

    await pokemonsRepository.delete(id);
  }
}

export default DeletePokemonService;
