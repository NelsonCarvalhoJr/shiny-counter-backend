import { injectable, inject } from 'tsyringe';

import IMethodsRepository from '../repositories/IMethodsRepository';

import Method from '../infra/typeorm/entities/Method';

interface IRequest {
  name: string;
  game_id: string;
}

@injectable()
class listMethodsByGameIdService {
  constructor(
    @inject('MethodsRepository')
    private methodsRepository: IMethodsRepository,
  ) {}

  public async execute({ name, game_id }: IRequest): Promise<Method[]> {
    const methods = await this.methodsRepository.allByGameId({
      name,
      game_id,
    });

    return methods;
  }
}

export default listMethodsByGameIdService;
