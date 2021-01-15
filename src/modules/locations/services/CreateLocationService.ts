import { getRepository } from 'typeorm';

import AppError from '@shared/errors/AppError';

import Location from '../infra/typeorm/entities/Location';

interface IRequest {
  name: string;
}

class CreateLocationService {
  public async execute({ name }: IRequest): Promise<Location> {
    const locationsRepository = getRepository(Location);

    const findByName = await locationsRepository
      .createQueryBuilder()
      .where('LOWER(name) = LOWER(:name)', { name })
      .getOne();

    if (findByName) {
      throw new AppError('This location already exists');
    }

    const location = locationsRepository.create({ name });

    await locationsRepository.save(location);

    return location;
  }
}

export default CreateLocationService;
