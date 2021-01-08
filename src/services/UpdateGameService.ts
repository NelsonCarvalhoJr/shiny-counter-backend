import { getRepository } from 'typeorm';

import Game from '../models/Game';

interface IRequest {
  id: string;
  name: string;
  generation_number: number;
}

class UpdateGameService {
  public async execute({
    id,
    name,
    generation_number,
  }: IRequest): Promise<Game> {
    const gamesRepository = getRepository(Game);

    const game = await gamesRepository.findOne(id);

    if (!game) {
      throw Error("This game ID doesn't exists");
    }

    const findByName = await gamesRepository
      .createQueryBuilder()
      .where('LOWER(name) = LOWER(:name)', { name })
      .getOne();

    if (findByName && findByName.id !== id) {
      throw Error('This game already exists');
    }

    game.name = name;
    game.generation_number = generation_number;

    await gamesRepository.save(game);

    return game;
  }
}

export default UpdateGameService;
