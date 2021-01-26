import { injectable, inject } from 'tsyringe';

import IMethodsRepository from '../repositories/IMethodsRepository';

import Method from '../infra/typeorm/entities/Method';

interface IRequest {
  name?: string;
}

@injectable()
class ListMethodsService {
  constructor(
    @inject('MethodsRepository')
    private methodsRepository: IMethodsRepository,
  ) {}

  public async execute({ name }: IRequest): Promise<Method[]> {
    const methods = await this.methodsRepository.all({
      name,
      order: {
        name: 'ASC',
      },
    });

    return methods;
  }
}

export default ListMethodsService;
