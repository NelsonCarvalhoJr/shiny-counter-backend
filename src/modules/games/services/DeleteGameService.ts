import AppError from '@shared/errors/AppError';

import IGamesRepository from '../repositories/IGamesRepository';

interface IRequest {
  id: string;
}

class DeleteGameService {
  constructor(private gamesRepository: IGamesRepository) {}

  public async execute({ id }: IRequest): Promise<void> {
    const game = await this.gamesRepository.findById(id);

    if (!game) {
      throw new AppError("This game ID doesn't exists", 404);
    }

    await this.gamesRepository.delete(id);
  }
}

export default DeleteGameService;
