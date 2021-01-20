import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import ILocationsRepository from '../repositories/ILocationsRepository';
import Location from '../infra/typeorm/entities/Location';

interface IRequest {
  name: string;
}

@injectable()
class CreateLocationService {
  constructor(
    @inject('LocationsRepository')
    private locationsRepository: ILocationsRepository,
  ) {}

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
