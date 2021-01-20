import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import IMethodsRepository from '../repositories/IMethodsRepository';
import Method from '../infra/typeorm/entities/Method';

interface IRequest {
  name: string;
}

@injectable()
class CreateMethodService {
  constructor(
    @inject('MethodsRepository')
    private methodsRepository: IMethodsRepository,
  ) {}

  public async execute({ name }: IRequest): Promise<Method> {
    const findByName = await this.methodsRepository.findByName(name);

    if (findByName) {
      throw new AppError('This method already exists');
    }

    const method = await this.methodsRepository.create({ name });

    return method;
  }
}

export default CreateMethodService;
