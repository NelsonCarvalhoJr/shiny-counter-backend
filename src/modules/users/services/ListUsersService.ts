import { injectable, inject } from 'tsyringe';

import IUsersRepository from '../repositories/IUsersRepository';
import User from '../infra/typeorm/entities/User';

interface IRequest {
  name: string;
  email: string;
}

@injectable()
class ListUsersService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
  ) {}

  public async execute({ name, email }: IRequest): Promise<User[]> {
    const users = await this.usersRepository.all({
      name,
      email,
      order: {
        name: 'ASC',
      },
    });

    return users;
  }
}

export default ListUsersService;
