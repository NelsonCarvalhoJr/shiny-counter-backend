import { getRepository } from 'typeorm';

import Method from '../models/Method';

interface IRequest {
  id: string;
}

class DeleteMethodService {
  public async execute({ id }: IRequest): Promise<void> {
    const methodsRepository = getRepository(Method);

    const method = await methodsRepository.findOne(id);

    if (!method) {
      throw Error("This method ID doesn't exists");
    }

    await methodsRepository.delete(id);
  }
}

export default DeleteMethodService;
