import User from '../infra/typeorm/entities/User';

import IFindAllUsersDTO from '../dtos/IFindAllUsersDTO';
import ICreateUserDTO from '../dtos/ICreateUserDTO';

export default interface IUsersRepository {
  all(data: IFindAllUsersDTO): Promise<User[]>;
  findById(id: string): Promise<User | undefined>;
  findByEmail(email: string): Promise<User | undefined>;
  create(data: ICreateUserDTO): Promise<User>;
  update(user: User): Promise<User>;
  delete(id: string): Promise<void>;
}
