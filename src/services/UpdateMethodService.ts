import { getRepository } from 'typeorm';

import Method from '../models/Method';

interface IRequest {
  id: string;
  name: string;
}

class UpdateMethodService {
  public async execute({ id, name }: IRequest): Promise<Method> {
    const methodsRepository = getRepository(Method);

    const method = await methodsRepository.findOne(id);

    if (!method) {
      throw Error("This method ID doesn't exists");
    }

    const findByName = await methodsRepository
      .createQueryBuilder()
      .where('LOWER(name) = LOWER(:name)', { name })
      .getOne();

    if (findByName && findByName.id !== id) {
      throw Error('This method already exists');
    }

    method.name = name;

    await methodsRepository.save(method);

    return method;
  }
}

export default UpdateMethodService;
