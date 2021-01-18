import AppError from '@shared/errors/AppError';

import ILocationsRepository from '../repositories/ILocationsRepository';
import Location from '../infra/typeorm/entities/Location';

interface IRequest {
  name: string;
}

class CreateLocationService {
  constructor(private locationsRepository: ILocationsRepository) {}

  public async execute({ name }: IRequest): Promise<Location> {
    const findByName = await this.locationsRepository.findByName(name);

    if (findByName) {
      throw new AppError('This location already exists');
    }

    const location = await this.locationsRepository.create({ name });

    return location;
  }
}

export default CreateLocationService;
