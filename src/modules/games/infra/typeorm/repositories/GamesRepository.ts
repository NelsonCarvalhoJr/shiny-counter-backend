import { getRepository, Repository, Raw, In } from 'typeorm';

import IGamesRepository from '@modules/games/repositories/IGamesRepository';
import IFindAllGamesDTO from '@modules/games/dtos/IFindAllGamesDTO';
import ICreateGameDTO from '@modules/games/dtos/ICreateGameDTO';

import Game from '../entities/Game';
import GamesMethods from '../entities/GamesMethods';

class GamesRepository implements IGamesRepository {
  private ormRepository: Repository<Game>;

  constructor() {
    this.ormRepository = getRepository(Game);
  }

  public async all({
    name = '',
    generation_number,
    order,
  }: IFindAllGamesDTO): Promise<Game[]> {
    const where = {
      name: Raw(alias => `LOWER(${alias}) Like '%${name.toLowerCase()}%'`),
      generation_number,
    };

    if (!generation_number) {
      delete where.generation_number;
    }

    const whereAndOrder = {
      where,
      order,
    };

    const games = await this.ormRepository.find(whereAndOrder);

    return games;
  }

  public async findById(id: string): Promise<Game | undefined> {
    const game = await this.ormRepository.findOne(id);

    return game;
  }

  public async findByName(name: string): Promise<Game | undefined> {
    const game = await this.ormRepository.findOne({
      where: {
        name: Raw(alias => `LOWER(${alias}) Like '%${name.toLowerCase()}%'`),
      },
    });

    return game;
  }

  public async create(gameData: ICreateGameDTO): Promise<Game> {
    const game = this.ormRepository.create(gameData);

    await this.ormRepository.save(game);

    return game;
  }

  public async update(game: Game): Promise<Game> {
    return this.ormRepository.save(game);
  }

  public async delete(id: string): Promise<void> {
    await this.ormRepository.delete(id);
  }

  public async addGamesMethods(
    game: Game,
    method_ids: string[],
  ): Promise<Game> {
    method_ids.forEach(method_id => {
      const gamesMethods = new GamesMethods();

      gamesMethods.game_id = game.id;
      gamesMethods.method_id = method_id;

      game.game_methods.push(gamesMethods);
    });

    await this.ormRepository.save(game);

    return game;
  }

  public async removeGamesMethods(
    game: Game,
    method_ids: string[],
  ): Promise<Game> {
    const gamesMethodsRepository = getRepository(GamesMethods);

    const gamesMethodsForDelete = await gamesMethodsRepository.find({
      where: {
        game_id: game.id,
        method_id: In(method_ids),
      },
    });

    await gamesMethodsRepository
      .createQueryBuilder()
      .delete()
      .andWhereInIds(gamesMethodsForDelete.map(gamesMethods => gamesMethods.id))
      .execute();

    const savedGame = await this.ormRepository.findOne(game.id);

    return savedGame as Game;
  }
}

export default GamesRepository;
