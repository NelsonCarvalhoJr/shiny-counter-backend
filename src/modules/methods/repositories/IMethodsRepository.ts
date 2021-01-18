import Method from '../infra/typeorm/entities/Method';

import IFindAllMethodsDTO from '../dtos/IFindAllMethodsDTO';
import IFindAllMethodsByGameIdDTO from '../dtos/IFindAllMethodsByGameIdDTO';
import ICreateMethodDTO from '../dtos/ICreateMethodDTO';

export default interface IMethodsRepository {
  all(data: IFindAllMethodsDTO): Promise<Method[]>;
  allByGameId(data: IFindAllMethodsByGameIdDTO): Promise<Method[]>;
  findById(id: string): Promise<Method | undefined>;
  findByIds(ids: string[]): Promise<Method[]>;
  findByName(name: string): Promise<Method | undefined>;
  create(data: ICreateMethodDTO): Promise<Method>;
  update(method: Method): Promise<Method>;
  delete(id: string): Promise<void>;
}
