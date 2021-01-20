import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import ILocationsRepository from '../repositories/ILocationsRepository';
import Location from '../infra/typeorm/entities/Location';

interface IRequest {
  id: string;
  name: string;
}

@injectable()
class UpdateLocationService {
  constructor(
    @inject('LocationsRepository')
    private locationsRepository: ILocationsRepository,
  ) {}

  public async execute({ id, name }: IRequest): Promise<Location> {
    const location = await this.locationsRepository.findById(id);

    if (!location) {
      throw new AppError("This location ID doesn't exists", 404);
    }

    const findByName = await this.locationsRepository.findByName(name);

    if (findByName && findByName.id !== id) {
      throw new AppError('This location already exists');
    }

    location.name = name;

    await this.locationsRepository.update(location);

    return location;
  }
}

export default UpdateLocationService;
