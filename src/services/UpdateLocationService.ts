import { getRepository } from 'typeorm';

import Location from '../models/Location';

import AppError from '../errors/AppError';

interface IRequest {
  id: string;
  name: string;
}

class UpdateLocationService {
  public async execute({ id, name }: IRequest): Promise<Location> {
    const locationsRepository = getRepository(Location);

    const location = await locationsRepository.findOne(id);

    if (!location) {
      throw new AppError("This location ID doesn't exists", 404);
    }

    const findByName = await locationsRepository
      .createQueryBuilder()
      .where('LOWER(name) = LOWER(:name)', { name })
      .getOne();

    if (findByName && findByName.id !== id) {
      throw new AppError('This location already exists');
    }

    location.name = name;

    await locationsRepository.save(location);

    return location;
  }
}

export default UpdateLocationService;
