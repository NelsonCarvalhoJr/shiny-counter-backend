import { getRepository } from 'typeorm';

import Location from '../models/Location';

interface IRequest {
  id: string;
}

class DeletePokemonService {
  public async execute({ id }: IRequest): Promise<void> {
    const locationsRepository = getRepository(Location);

    const location = await locationsRepository.findOne(id);

    if (!location) {
      throw Error("This location ID doesn't exists");
    }

    await locationsRepository.delete(id);
  }
}

export default DeletePokemonService;
