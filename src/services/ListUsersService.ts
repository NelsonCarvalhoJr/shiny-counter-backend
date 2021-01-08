import { getRepository, FindOperator, Raw } from 'typeorm';

import User from '../models/User';

interface IRequest {
  name: string;
  email: string;
}

interface IFindConditions {
  name: FindOperator<any>;
  email: FindOperator<any>;
}

class ListUsersService {
  public async execute({ name = '', email = '' }: IRequest): Promise<User[]> {
    const usersRepository = getRepository(User);

    const findOptions: IFindConditions = {
      name: Raw(alias => `LOWER(${alias}) Like '%${name.toLowerCase()}%'`),
      email: Raw(alias => `LOWER(${alias}) Like '%${email.toLowerCase()}%'`),
    };

    const users = await usersRepository.find({
      where: findOptions,
      order: { name: 'ASC' },
    });

    const formattedUsers = users.map(user => {
      const formattedUser = user;
      delete formattedUser.password;
      return formattedUser;
    });

    return formattedUsers;
  }
}

export default ListUsersService;
