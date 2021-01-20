import { injectable, inject } from 'tsyringe';

import ILocationsRepository from '../repositories/ILocationsRepository';

import Location from '../infra/typeorm/entities/Location';

interface IRequest {
  name: string;
}

@injectable()
class ListLocationsService {
  constructor(
    @inject('LocationsRepository')
    private locationsRepository: ILocationsRepository,
  ) {}

  public async execute({ name }: IRequest): Promise<Location[]> {
    const locations = await this.locationsRepository.all({
      name,
      order: { name: 'ASC' },
    });

    return locations;
  }
}

export default ListLocationsService;
