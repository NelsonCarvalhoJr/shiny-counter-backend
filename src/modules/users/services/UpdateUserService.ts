import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import IUsersRepository from '../repositories/IUsersRepository';
import User from '../infra/typeorm/entities/User';

import IHashProvider from '../providers/HashProvider/models/IHashProvider';

interface IRequest {
  id: string;
  name: string;
  email: string;
  old_password: string;
  password: string;
}

@injectable()
class UpdateUserService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('HashProvider')
    private hashProvider: IHashProvider,
  ) {}

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
      const comparePassword = await this.hashProvider.compareHash(
        old_password,
        user.password as string,
      );

      if (!comparePassword) {
        throw new AppError('Invalid old password');
      }

      const hashedPassword = await this.hashProvider.generateHash(password);

      user.password = hashedPassword;
    }

    await this.usersRepository.update(user);

    return user;
  }
}

export default UpdateUserService;
