import { getRepository } from 'typeorm';

import Location from '../models/Location';

import AppError from '../errors/AppError';

interface IRequest {
  id: string;
}

class DeletePokemonService {
  public async execute({ id }: IRequest): Promise<void> {
    const locationsRepository = getRepository(Location);

    const location = await locationsRepository.findOne(id);

    if (!location) {
      throw new AppError("This location ID doesn't exists", 404);
    }

    await locationsRepository.delete(id);
  }
}

export default DeletePokemonService;
