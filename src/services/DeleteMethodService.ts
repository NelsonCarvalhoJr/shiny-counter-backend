import { getRepository } from 'typeorm';

import Method from '../models/Method';

import AppError from '../errors/AppError';

interface IRequest {
  id: string;
}

class DeleteMethodService {
  public async execute({ id }: IRequest): Promise<void> {
    const methodsRepository = getRepository(Method);

    const method = await methodsRepository.findOne(id);

    if (!method) {
      throw new AppError("This method ID doesn't exists", 404);
    }

    await methodsRepository.delete(id);
  }
}

export default DeleteMethodService;
