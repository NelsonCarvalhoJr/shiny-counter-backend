import { getRepository } from 'typeorm';

import AppError from '@shared/errors/AppError';

import Pokemon from '../infra/typeorm/entities/Pokemon';

interface IRequest {
  id: string;
}

class DeletePokemonService {
  public async execute({ id }: IRequest): Promise<void> {
    const pokemonsRepository = getRepository(Pokemon);

    const pokemon = await pokemonsRepository.findOne(id);

    if (!pokemon) {
      throw new AppError("This pokémon ID doesn't exists", 404);
    }

    await pokemonsRepository.delete(id);
  }
}

export default DeletePokemonService;
