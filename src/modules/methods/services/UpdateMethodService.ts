import AppError from '@shared/errors/AppError';

import IMethodsRepository from '../repositories/IMethodsRepository';
import Method from '../infra/typeorm/entities/Method';
import MethodsRepository from '../infra/typeorm/repositories/MethodsRepository';

interface IRequest {
  id: string;
  name: string;
}

class UpdateMethodService {
  constructor(private methodsRepository: MethodsRepository) {}

  public async execute({ id, name }: IRequest): Promise<Method> {
    const method = await this.methodsRepository.findById(id);

    if (!method) {
      throw new AppError("This method ID doesn't exists", 404);
    }

    const findByName = await this.methodsRepository.findByName(name);

    if (findByName && findByName.id !== id) {
      throw new AppError('This method already exists');
    }

    method.name = name;

    await this.methodsRepository.update(method);

    return method;
  }
}

export default UpdateMethodService;
