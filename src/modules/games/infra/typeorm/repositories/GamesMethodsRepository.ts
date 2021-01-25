import { getRepository, Repository, In } from 'typeorm';

import IGamesMethodsRepository from '@modules/games/repositories/IGamesMethodsRepository';
import IFindAllGamesMethodsDTO from '@modules/games/dtos/IFindAllGamesMethodsDTO';
import ICreateGamesMethodsDTO from '@modules/games/dtos/ICreateGamesMethodsDTO';

import GamesMethods from '../entities/GamesMethods';

class GamesMethodsRepository implements IGamesMethodsRepository {
  private ormRepository: Repository<GamesMethods>;

  constructor() {
    this.ormRepository = getRepository(GamesMethods);
  }

  public async all({
    game_id,
    method_id,
  }: IFindAllGamesMethodsDTO): Promise<GamesMethods[]> {
    const gamesMethods = await this.ormRepository.find({
      where: {
        game_id,
        method_id: In(method_id),
      },
    });

    return gamesMethods;
  }

  public async create(
    gamesMethodsData: ICreateGamesMethodsDTO,
  ): Promise<GamesMethods> {
    const gamesMethods = this.ormRepository.create(gamesMethodsData);

    await this.ormRepository.save(gamesMethods);

    return gamesMethods;
  }

  public async delete(id: string): Promise<void> {
    await this.ormRepository.delete(id);
  }
}

export default GamesMethodsRepository;
