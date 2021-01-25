import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import ILocationsRepository from '../repositories/ILocationsRepository';
import Location from '../infra/typeorm/entities/Location';

interface IRequest {
  id: string;
}

@injectable()
class ShowLocationService {
  constructor(
    @inject('LocationsRepository')
    private LocationsRepository: ILocationsRepository,
  ) {}

  public async execute({ id }: IRequest): Promise<Location> {
    const location = await this.LocationsRepository.findById(id);

    if (!location) {
      throw new AppError('Location not found', 404);
    }

    return location;
  }
}

export default ShowLocationService;
