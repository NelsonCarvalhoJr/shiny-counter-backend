import AppError from '@shared/errors/AppError';

import IUsersRepository from '../repositories/IUsersRepository';

interface IRequest {
  id: string;
}

class DeleteUserService {
  constructor(private usersRepository: IUsersRepository) {}

  public async execute({ id }: IRequest): Promise<void> {
    const user = await this.usersRepository.findById(id);

    if (!user) {
      throw new AppError("This user ID doesn't exists", 404);
    }

    await this.usersRepository.delete(id);
  }
}

export default DeleteUserService;
