import { getRepository } from 'typeorm';

import Game from '../models/Game';

interface IRequest {
  id: string;
}

class DeleteGameService {
  public async execute({ id }: IRequest): Promise<void> {
    const gamesRepository = getRepository(Game);

    const game = await gamesRepository.findOne(id);

    if (!game) {
      throw Error("This game ID doesn't exists");
    }

    await gamesRepository.delete(id);
  }
}

export default DeleteGameService;
