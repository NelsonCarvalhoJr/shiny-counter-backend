import { v4 as uuid } from 'uuid';

import IGamesMethodsRepository from '@modules/games/repositories/IGamesMethodsRepository';
import IFindAllGamesMethodsDTO from '@modules/games/dtos/IFindAllGamesMethodsDTO';
import ICreateGamesMethodsDTO from '@modules/games/dtos/ICreateGamesMethodsDTO';

import GamesMethods from '../../infra/typeorm/entities/GamesMethods';

class GamesMethodsRepository implements IGamesMethodsRepository {
  private gamesMethods: GamesMethods[] = [];

  public async all({
    game_id,
    method_id,
  }: IFindAllGamesMethodsDTO): Promise<GamesMethods[]> {
    let filteredGamesMethods = this.gamesMethods.filter(
      gamesMethods => gamesMethods.game_id === game_id,
    );

    filteredGamesMethods = this.gamesMethods.filter(gamesMethods =>
      method_id.includes(gamesMethods.method_id),
    );

    return filteredGamesMethods;
  }

  public async create(
    gamesMethodsData: ICreateGamesMethodsDTO,
  ): Promise<GamesMethods> {
    const gamesMethods = new GamesMethods();

    Object.assign(gamesMethods, gamesMethodsData, { id: uuid() });

    this.gamesMethods.push(gamesMethods);

    return gamesMethods;
  }

  public async delete(id: string): Promise<void> {
    const gamesMethodsIndex = this.gamesMethods.findIndex(
      gamesMethods => gamesMethods.id === id,
    );

    this.gamesMethods.splice(gamesMethodsIndex, 1);
  }
}

export default GamesMethodsRepository;
