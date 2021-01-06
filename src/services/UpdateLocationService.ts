import { getRepository } from 'typeorm';

import Location from '../models/Location';

interface IRequest {
  id: string;
  name: string;
}

class UpdateLocationService {
  public async execute({ id, name }: IRequest): Promise<Location> {
    const locationsRepository = getRepository(Location);

    const location = await locationsRepository.findOne(id);

    if (!location) {
      throw Error("This location ID doesn't exists");
    }

    const findByName = await locationsRepository
      .createQueryBuilder()
      .where('LOWER(name) = LOWER(:name)', { name })
      .getOne();

    if (findByName && findByName.id !== id) {
      throw Error('This location already exists');
    }

    location.name = name;

    await locationsRepository.save(location);

    return location;
  }
}

export default UpdateLocationService;
