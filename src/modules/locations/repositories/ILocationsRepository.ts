import Location from '../infra/typeorm/entities/Location';

import IFindAllLocationsDTO from '../dtos/IFindAllLocationsDTO';
import ICreateLocationDTO from '../dtos/ICreateLocationDTO';

export default interface ILocationsRepository {
  all(data: IFindAllLocationsDTO): Promise<Location[]>;
  findById(id: string): Promise<Location | undefined>;
  findByName(name: string): Promise<Location | undefined>;
  create(data: ICreateLocationDTO): Promise<Location>;
  update(location: Location): Promise<Location>;
  delete(id: string): Promise<void>;
}
