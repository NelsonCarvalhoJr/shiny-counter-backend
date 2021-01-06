import { getRepository } from 'typeorm';

import Location from '../models/Location';

interface IRequest {
  name?: string;
}

class ListLocationsService {
  public async execute({ name }: IRequest): Promise<Location[]> {
    const locationsRepository = getRepository(Location);

    const queryBuilder = await locationsRepository.createQueryBuilder();

    if (name) {
      queryBuilder.where('LOWER(name) LIKE :name', {
        name: `%${name.toLowerCase()}%`,
      });
    }

    const locations = await queryBuilder.getMany();

    return locations;
  }
}

export default ListLocationsService;
