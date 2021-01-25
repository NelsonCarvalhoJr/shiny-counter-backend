import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import IMethodsRepository from '../repositories/IMethodsRepository';
import Method from '../infra/typeorm/entities/Method';

interface IRequest {
  id: string;
}

@injectable()
class ShowMethodService {
  constructor(
    @inject('MethodsRepository')
    private MethodsRepository: IMethodsRepository,
  ) {}

  public async execute({ id }: IRequest): Promise<Method> {
    const method = await this.MethodsRepository.findById(id);

    if (!method) {
      throw new AppError('Method not found', 404);
    }

    return method;
  }
}

export default ShowMethodService;
