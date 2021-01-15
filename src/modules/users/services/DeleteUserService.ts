import { getRepository } from 'typeorm';

import AppError from '@shared/errors/AppError';

import User from '../infra/typeorm/entities/User';

interface IRequest {
  id: string;
}

class DeleteUserService {
  public async execute({ id }: IRequest): Promise<void> {
    const usersRepository = getRepository(User);

    const user = await usersRepository.findOne(id);

    if (!user) {
      throw new AppError("This user ID doesn't exists", 404);
    }

    await usersRepository.delete(id);
  }
}

export default DeleteUserService;
