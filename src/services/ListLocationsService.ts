import { getRepository, FindOperator, Raw } from 'typeorm';

import Location from '../models/Location';

interface IRequest {
  name: string;
}

interface IFindConditions {
  name: FindOperator<any>;
}

class ListLocationsService {
  public async execute({ name = '' }: IRequest): Promise<Location[]> {
    const locationsRepository = getRepository(Location);

    const findOptions: IFindConditions = {
      name: Raw(alias => `LOWER(${alias}) Like '%${name.toLowerCase()}%'`),
    };

    const locations = await locationsRepository.find({
      where: findOptions,
      order: { name: 'ASC' },
    });

    return locations;
  }
}

export default ListLocationsService;
