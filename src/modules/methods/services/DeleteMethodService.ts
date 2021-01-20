import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import IMethodsRepository from '../repositories/IMethodsRepository';

interface IRequest {
  id: string;
}

@injectable()
class DeleteMethodService {
  constructor(
    @inject('MethodsRepository')
    private methodsRepository: IMethodsRepository,
  ) {}

  public async execute({ id }: IRequest): Promise<void> {
    const method = await this.methodsRepository.findById(id);

    if (!method) {
      throw new AppError("This method ID doesn't exists", 404);
    }

    await this.methodsRepository.delete(id);
  }
}

export default DeleteMethodService;
