import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import IPokemonsRepository from '../repositories/IPokemonsRepository';

import Pokemon from '../infra/typeorm/entities/Pokemon';

interface IRequest {
  id: string;
}

@injectable()
class ShowPokemonService {
  constructor(
    @inject('PokemonsRepository')
    private PokemonsRepository: IPokemonsRepository,
  ) {}

  public async execute({ id }: IRequest): Promise<Pokemon> {
    const pokemon = await this.PokemonsRepository.findById(id);

    if (!pokemon) {
      throw new AppError('Pokemon not found', 404);
    }

    return pokemon;
  }
}

export default ShowPokemonService;
