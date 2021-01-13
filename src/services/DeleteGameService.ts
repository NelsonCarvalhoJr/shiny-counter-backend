import { getRepository } from 'typeorm';

import Game from '../models/Game';

import AppError from '../errors/AppError';

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
