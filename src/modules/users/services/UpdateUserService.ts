import { compare, hash } from 'bcryptjs';

import AppError from '@shared/errors/AppError';

import IUsersRepository from '../repositories/IUsersRepository';
import User from '../infra/typeorm/entities/User';

interface IRequest {
  id: string;
  name: string;
  email: string;
  old_password: string;
  password: string;
}

class UpdateUserService {
  constructor(private usersRepository: IUsersRepository) {}

  public async execute({
    id,
    name,
    email,
    old_password,
    password,
  }: IRequest): Promise<User> {
    const user = await this.usersRepository.findById(id);

    if (!user) {
      throw new AppError("This user ID doesn't exists", 404);
    }

    const findByEmail = await this.usersRepository.findByEmail(email);

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

    await this.usersRepository.update(user);

    return user;
  }
}

export default UpdateUserService;
