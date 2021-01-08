import { getRepository } from 'typeorm';

import User from '../models/User';

interface IRequest {
  id: string;
}

class DeleteUserService {
  public async execute({ id }: IRequest): Promise<void> {
    const usersRepository = getRepository(User);

    const user = await usersRepository.findOne(id);

    if (!user) {
      throw Error("This user ID doesn't exists");
    }

    await usersRepository.delete(id);
  }
}

export default DeleteUserService;
