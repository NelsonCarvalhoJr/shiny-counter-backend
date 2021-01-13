import { getRepository } from 'typeorm';

import Method from '../models/Method';

import AppError from '../errors/AppError';

interface IRequest {
  name: string;
}

class CreateMethodService {
  public async execute({ name }: IRequest): Promise<Method> {
    const createMethodService = getRepository(Method);

    const findByName = await createMethodService
      .createQueryBuilder()
      .where('LOWER(name) = LOWER(:name)', { name })
      .getOne();

    if (findByName) {
      throw new AppError('This method already exists');
    }

    const method = createMethodService.create({ name });

    await createMethodService.save(method);

    return method;
  }
}

export default CreateMethodService;
