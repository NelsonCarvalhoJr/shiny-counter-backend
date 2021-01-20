import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import IPokemonsRepository from '../repositories/IPokemonsRepository';

interface IRequest {
  id: string;
}

@injectable()
class DeletePokemonService {
  constructor(
    @inject('PokemonsRepository')
    private pokemonsRepository: IPokemonsRepository,
  ) {}

  public async execute({ id }: IRequest): Promise<void> {
    const pokemon = await this.pokemonsRepository.findById(id);

    if (!pokemon) {
      throw new AppError("This pokémon ID doesn't exists", 404);
    }

    await this.pokemonsRepository.delete(id);
  }
}

export default DeletePokemonService;
