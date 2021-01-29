import { getRepository, Repository, Raw, In } from 'typeorm';

import IMethodsRepository from '@modules/methods/repositories/IMethodsRepository';
import IFindAllMethodsDTO from '@modules/methods/dtos/IFindAllMethodsDTO';
import IFindAllMethodsByGameIdDTO from '@modules/methods/dtos/IFindAllMethodsByGameIdDTO';
import ICreateMethodDTO from '@modules/methods/dtos/ICreateMethodDTO';

import GamesMethods from '@modules/games/infra/typeorm/entities/GamesMethods';
import Method from '../entities/Method';

class MethodsRepository implements IMethodsRepository {
  private ormRepository: Repository<Method>;

  constructor() {
    this.ormRepository = getRepository(Method);
  }

  public async all({
    name = '',
    order,
  }: IFindAllMethodsDTO): Promise<Method[]> {
    const where = {
      name: Raw(alias => `LOWER(${alias}) Like '%${name.toLowerCase()}%'`),
    };

    const whereAndOrder = {
      where,
      order,
    };

    const methods = await this.ormRepository.find(whereAndOrder);

    return methods;
  }

  public async allByGameId({
    name = '',
    game_id,
  }: IFindAllMethodsByGameIdDTO): Promise<Method[]> {
    const queryBuilder = this.ormRepository.createQueryBuilder('m');

    queryBuilder.where('LOWER(m.name) LIKE :name', {
      name: `%${name.toLowerCase()}%`,
    });

    queryBuilder.leftJoin('games_methods', 'gm', 'gm.method_id = m.id');
    queryBuilder.andWhere('gm.game_id = :game_id', { game_id });

    const methods = await queryBuilder.getMany();

    return methods;
  }

  public async findById(id: string): Promise<Method | undefined> {
    const method = this.ormRepository.findOne(id);

    return method;
  }

  public async findByIds(ids: string[]): Promise<Method[]> {
    const methods = await this.ormRepository.findByIds(ids);

    return methods;
  }

  public async findByName(name: string): Promise<Method | undefined> {
    const method = await this.ormRepository.findOne({
      where: {
        name: Raw(alias => `LOWER(${alias}) Like '%${name.toLowerCase()}%'`),
      },
    });

    return method;
  }

  public async create(methodData: ICreateMethodDTO): Promise<Method> {
    const method = this.ormRepository.create(methodData);

    await this.ormRepository.save(method);

    return method;
  }

  public async update(method: Method): Promise<Method> {
    return this.ormRepository.save(method);
  }

  public async delete(id: string): Promise<void> {
    await this.ormRepository.delete(id);
  }

  public async addGamesMethods(
    method: Method,
    game_ids: string[],
  ): Promise<Method> {
    game_ids.forEach(game_id => {
      const gamesMethods = new GamesMethods();

      gamesMethods.method_id = method.id;
      gamesMethods.game_id = game_id;

      method.game_methods.push(gamesMethods);
    });

    await this.ormRepository.save(method);

    return method;
  }

  public async removeGamesMethods(
    method: Method,
    game_ids: string[],
  ): Promise<Method> {
    const gamesMethodsRepository = getRepository(GamesMethods);

    const gamesMethodsForDelete = await gamesMethodsRepository.find({
      where: {
        method_id: method.id,
        game_id: In(game_ids),
      },
    });

    await gamesMethodsRepository
      .createQueryBuilder()
      .delete()
      .andWhereInIds(gamesMethodsForDelete.map(gamesMethods => gamesMethods.id))
      .execute();

    const savedMethod = await this.ormRepository.findOne(method.id);

    return savedMethod as Method;
  }
}

export default MethodsRepository;
