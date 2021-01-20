import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import ILocationsRepository from '../repositories/ILocationsRepository';

interface IRequest {
  id: string;
}

@injectable()
class DeletePokemonService {
  constructor(
    @inject('LocationsRepository')
    private locationsRepository: ILocationsRepository,
  ) {}

  public async execute({ id }: IRequest): Promise<void> {
    const location = await this.locationsRepository.findById(id);

    if (!location) {
      throw new AppError("This location ID doesn't exists", 404);
    }

    await this.locationsRepository.delete(id);
  }
}

export default DeletePokemonService;
