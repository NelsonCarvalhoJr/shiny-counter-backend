import { getRepository, Repository, Raw } from 'typeorm';

import IGamesRepository from '@modules/games/repositories/IGamesRepository';
import IFindAllGamesDTO from '@modules/games/dtos/IFindAllGamesDTO';
import ICreateGameDTO from '@modules/games/dtos/ICreateGameDTO';

import Game from '../entities/Game';

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
}

export default GamesRepository;
