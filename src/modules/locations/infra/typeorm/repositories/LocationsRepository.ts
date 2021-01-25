import { getRepository, Repository, Raw } from 'typeorm';

import ILocationsRepository from '@modules/locations/repositories/ILocationsRepository';
import IFindAllLocationsDTO from '@modules/locations/dtos/IFindAllLocationsDTO';
import ICreateLocationDTO from '@modules/locations/dtos/ICreateLocationDTO';

import Location from '../entities/Location';

class LocationsRepository implements ILocationsRepository {
  private ormRepository: Repository<Location>;

  constructor() {
    this.ormRepository = getRepository(Location);
  }

  public async all({
    name = '',
    order,
  }: IFindAllLocationsDTO): Promise<Location[]> {
    const where = {
      name: Raw(alias => `LOWER(${alias}) Like '%${name.toLowerCase()}%'`),
    };

    const whereAndOrder = {
      where,
      order,
    };

    const locations = await this.ormRepository.find(whereAndOrder);

    return locations;
  }

  public async findById(id: string): Promise<Location | undefined> {
    const location = await this.ormRepository.findOne(id);

    return location;
  }

  public async findByName(name: string): Promise<Location | undefined> {
    const location = await this.ormRepository.findOne({
      where: {
        name: Raw(alias => `LOWER(${alias}) Like '%${name.toLowerCase()}%'`),
      },
    });

    return location;
  }

  public async create(locationData: ICreateLocationDTO): Promise<Location> {
    const location = this.ormRepository.create(locationData);

    await this.ormRepository.save(location);

    return location;
  }

  public async update(location: Location): Promise<Location> {
    return this.ormRepository.save(location);
  }

  public async delete(id: string): Promise<void> {
    await this.ormRepository.delete(id);
  }
}

export default LocationsRepository;
