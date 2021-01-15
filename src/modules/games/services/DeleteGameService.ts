import { getRepository } from 'typeorm';

import AppError from '@shared/errors/AppError';

import Game from '../infra/typeorm/entities/Game';

interface IRequest {
  id: string;
}

class DeleteGameService {
  public async execute({ id }: IRequest): Promise<void> {
    const gamesRepository = getRepository(Game);

    const game = await gamesRepository.findOne(id);

    if (!game) {
      throw new AppError("This game ID doesn't exists", 404);
    }

    await gamesRepository.delete(id);
  }
}

export default DeleteGameService;
