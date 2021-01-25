import { getRepository, Repository, Raw } from 'typeorm';

import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import IFindAllUsersDTO from '@modules/users/dtos/IFindAllUsersDTO';
import ICreateUserDTO from '@modules/users/dtos/ICreateUserDTO';

import User from '../entities/User';

class UsersRepository implements IUsersRepository {
  private ormRepository: Repository<User>;

  constructor() {
    this.ormRepository = getRepository(User);
  }

  public async all({
    name = '',
    email = '',
    order,
  }: IFindAllUsersDTO): Promise<User[]> {
    const where = {
      name: Raw(alias => `LOWER(${alias}) Like '%${name.toLowerCase()}%'`),
      email: Raw(alias => `LOWER(${alias}) Like '%${email.toLowerCase()}%'`),
    };

    const whereAndOrder = {
      where,
      order,
    };

    const users = await this.ormRepository.find(whereAndOrder);

    return users;
  }

  public async findById(id: string): Promise<User | undefined> {
    const user = await this.ormRepository.findOne(id);

    return user;
  }

  public async findByEmail(email: string): Promise<User | undefined> {
    const user = await this.ormRepository.findOne({
      where: {
        email: Raw(alias => `LOWER(${alias}) Like '%${email.toLowerCase()}%'`),
      },
    });

    return user;
  }

  public async create(userData: ICreateUserDTO): Promise<User> {
    const user = this.ormRepository.create(userData);

    await this.ormRepository.save(user);

    return user;
  }

  public async update(user: User): Promise<User> {
    return this.ormRepository.save(user);
  }

  public async delete(id: string): Promise<void> {
    await this.ormRepository.delete(id);
  }
}

export default UsersRepository;
