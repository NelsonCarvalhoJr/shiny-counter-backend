import { getRepository } from 'typeorm';

import User from '../models/User';

interface IRequest {
  name: string;
  email: string;
}

class ListUsersService {
  public async execute({ name, email }: IRequest): Promise<User[]> {
    const usersRepository = getRepository(User);

    const queryBuilder = await usersRepository.createQueryBuilder();

    if (name) {
      queryBuilder.where('LOWER(name) LIKE :name', {
        name: `%${name.toLowerCase()}%`,
      });
    }

    if (email) {
      queryBuilder.where('LOWER(email) LIKE :email', {
        email: `%${email.toLowerCase()}%`,
      });
    }

    const users = await queryBuilder.getMany();

    const formattedUsers = users.map(user => {
      const formattedUser = user;
      delete formattedUser.password;
      return formattedUser;
    });

    return formattedUsers;
  }
}

export default ListUsersService;
