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
      if (!method.game_methods) {
        return false;
      }

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
    method_id: string,
    game_id: string,
  ): Promise<void> {
    const methodIndex = this.methods.findIndex(
      method => method.id === method_id,
    );

    const gamesMethods = new GamesMethods();

    Object.assign(gamesMethods, {
      id: uuid(),
      method_id,
      game_id,
    });

    if (!this.methods[methodIndex].game_methods) {
      this.methods[methodIndex].game_methods = [];
    }

    this.methods[methodIndex].game_methods.push(gamesMethods);
  }
}

export default FakeMethodsRepository;
