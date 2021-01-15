import { getRepository } from 'typeorm';
import { compare, hash } from 'bcryptjs';

import AppError from '@shared/errors/AppError';

import User from '../infra/typeorm/entities/User';

interface IRequest {
  id: string;
  name: string;
  email: string;
  old_password: string;
  password: string;
}

class UpdateUserService {
  public async execute({
    id,
    name,
    email,
    old_password,
    password,
  }: IRequest): Promise<User> {
    const usersRepository = getRepository(User);

    const user = await usersRepository.findOne(id);

    if (!user) {
      throw new AppError("This user ID doesn't exists", 404);
    }

    const findByEmail = await usersRepository
      .createQueryBuilder()
      .where('LOWER(email) = LOWER(:email)', { email })
      .getOne();

    if (findByEmail && findByEmail.id !== id) {
      throw new AppError('This email already used');
    }

    user.name = name;
    user.email = email;

    if (password) {
      const comparePassword = await compare(
        old_password,
        user.password as string,
      );

      if (!comparePassword) {
        throw new AppError('Invalid old password');
      }

      const hashedPassword = await hash(password, 8);

      user.password = hashedPassword;
    }

    await usersRepository.save(user);

    return user;
  }
}

export default UpdateUserService;
