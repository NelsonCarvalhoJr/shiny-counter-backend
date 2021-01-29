import { v4 as uuid } from 'uuid';

import IMethodsRepository from '@modules/methods/repositories/IMethodsRepository';
import IFindAllMethodsDTO from '@modules/methods/dtos/IFindAllMethodsDTO';
import IFindAllMethodsByGameIdDTO from '@modules/methods/dtos/IFindAllMethodsByGameIdDTO';
import ICreateMethodDTO from '@modules/methods/dtos/ICreateMethodDTO';

import GamesMethods from '@modules/games/infra/typeorm/entities/GamesMethods';
import Method from '../../infra/typeorm/entities/Method';

class FakeMethodsRepository implements IMethodsRepository {
  private methods: Method[] = [];

  public async all({ name = '' }: IFindAllMethodsDTO): Promise<Method[]> {
    const filteredMethods = this.methods.filter(method =>
      method.name.toLowerCase().includes(name.toLowerCase()),
    );

    return filteredMethods;
  }

  public async allByGameId({
    name = '',
    game_id,
  }: IFindAllMethodsByGameIdDTO): Promise<Method[]> {
    let filteredMethods = this.methods.filter(method =>
      method.name.toLowerCase().includes(name.toLowerCase()),
    );

    filteredMethods = filteredMethods.filter(method => {
      return (
        method.game_methods.filter(
          games_methods => games_methods.game_id === game_id,
        ).length > 0
      );
    });

    return filteredMethods;
  }

  public async findById(id: string): Promise<Method | undefined> {
    const findMethod = this.methods.find(method => method.id === id);

    return findMethod;
  }

  public async findByIds(ids: string[]): Promise<Method[]> {
    const methods = this.methods.filter(method => ids.includes(method.id));

    return methods;
  }

  public async findByName(name: string): Promise<Method | undefined> {
    const findMethod = this.methods.find(
      method => method.name.toLowerCase() === name.toLowerCase(),
    );

    return findMethod;
  }

  public async create(methodData: ICreateMethodDTO): Promise<Method> {
    const method = new Method();

    Object.assign(method, methodData, { id: uuid() });

    method.game_methods = [];

    this.methods.push(method);

    return method;
  }

  public async update(method: Method): Promise<Method> {
    const methodIndex = this.methods.findIndex(
      iterableMethod => iterableMethod.id === method.id,
    );

    this.methods[methodIndex] = method;

    return this.methods[methodIndex];
  }

  public async delete(id: string): Promise<void> {
    const methodIndex = this.methods.findIndex(method => method.id === id);

    this.methods.splice(methodIndex, 1);
  }

  public async addGamesMethods(
    method: Method,
    game_ids: string[],
  ): Promise<Method> {
    const methodIndex = this.methods.findIndex(
      iterableMethod => iterableMethod.id === method.id,
    );

    game_ids.forEach(game_id => {
      const gamesMethods = new GamesMethods();

      Object.assign(gamesMethods, {
        id: uuid(),
        method_id: method.id,
        game_id,
      });

      this.methods[methodIndex].game_methods.push(gamesMethods);
    });

    return this.methods[methodIndex];
  }

  public async removeGamesMethods(
    method: Method,
    game_ids: string[],
  ): Promise<Method> {
    const methodIndex = this.methods.findIndex(
      iterableMethod => iterableMethod.id === method.id,
    );

    game_ids.forEach(game_id => {
      const gameIndex = this.methods[methodIndex].game_methods.findIndex(
        games_methods => games_methods.game_id === game_id,
      );

      if (gameIndex >= 0) {
        this.methods[methodIndex].game_methods.splice(gameIndex, 1);
      }
    });

    return this.methods[methodIndex];
  }
}

export default FakeMethodsRepository;
