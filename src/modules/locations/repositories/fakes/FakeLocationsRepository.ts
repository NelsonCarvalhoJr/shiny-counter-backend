import { v4 as uuid } from 'uuid';

import ILocationsRepository from '@modules/locations/repositories/ILocationsRepository';
import IFindAllLocationsDTO from '@modules/locations/dtos/IFindAllLocationsDTO';
import ICreateLocationDTO from '@modules/locations/dtos/ICreateLocationDTO';

import Location from '../../infra/typeorm/entities/Location';

class FakeLocationsRepository implements ILocationsRepository {
  private locations: Location[] = [];

  public async all({ name = '' }: IFindAllLocationsDTO): Promise<Location[]> {
    const filteredlocations = this.locations.filter(location =>
      location.name.toLowerCase().includes(name.toLowerCase()),
    );

    return filteredlocations;
  }

  public async findById(id: string): Promise<Location | undefined> {
    const findLocation = this.locations.find(location => location.id === id);

    return findLocation;
  }

  public async findByName(name: string): Promise<Location | undefined> {
    const findLocation = this.locations.find(
      location => location.name.toLowerCase() === name.toLowerCase(),
    );

    return findLocation;
  }

  public async create(locationData: ICreateLocationDTO): Promise<Location> {
    const location = new Location();

    Object.assign(location, locationData, { id: uuid() });

    this.locations.push(location);

    return location;
  }

  public async update(location: Location): Promise<Location> {
    const locationIndex = this.locations.findIndex(
      iterableLocation => iterableLocation.id === location.id,
    );

    this.locations[locationIndex] = location;

    return this.locations[locationIndex];
  }

  public async delete(id: string): Promise<void> {
    const locationIndex = this.locations.findIndex(
      location => location.id === id,
    );

    this.locations.splice(locationIndex, 1);
  }
}

export default FakeLocationsRepository;
