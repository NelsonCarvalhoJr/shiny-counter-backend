import { v4 as uuid } from 'uuid';

import IGamesRepository from '@modules/games/repositories/IGamesRepository';
import IFindAllGamesDTO from '@modules/games/dtos/IFindAllGamesDTO';
import ICreateGameDTO from '@modules/games/dtos/ICreateGameDTO';

import Game from '../../infra/typeorm/entities/Game';
import GamesMethods from '../../infra/typeorm/entities/GamesMethods';

class FakeGamesRepository implements IGamesRepository {
  private games: Game[] = [];

  public async all({
    name = '',
    generation_number,
  }: IFindAllGamesDTO): Promise<Game[]> {
    let filteredGames = this.games.filter(game =>
      game.name.toLowerCase().includes(name.toLowerCase()),
    );

    if (generation_number) {
      filteredGames = this.games.filter(
        game => game.generation_number === generation_number,
      );
    }

    return filteredGames;
  }

  public async findById(id: string): Promise<Game | undefined> {
    const findGame = this.games.find(game => game.id === id);

    return findGame;
  }

  public async findByName(name: string): Promise<Game | undefined> {
    const findGame = this.games.find(
      game => game.name.toLowerCase() === name.toLowerCase(),
    );

    return findGame;
  }

  public async create(gameData: ICreateGameDTO): Promise<Game> {
    const game = new Game();

    const { name, generation_number, game_methods } = gameData;

    Object.assign(game, { name, generation_number, id: uuid() });

    game.game_methods = [];

    if (game_methods) {
      game_methods.forEach(game_method => {
        const gamesMethods = new GamesMethods();

        Object.assign(gamesMethods, {
          id: uuid(),
          game_id: game.id,
          method_id: game_method.method_id,
        });

        game.game_methods.push(gamesMethods);
      });
    }

    this.games.push(game);

    return game;
  }

  public async update(game: Game): Promise<Game> {
    const gameIndex = this.games.findIndex(
      iterableGame => iterableGame.id === game.id,
    );

    this.games[gameIndex] = game;

    return this.games[gameIndex];
  }

  public async delete(id: string): Promise<void> {
    const gameIndex = this.games.findIndex(game => game.id === id);

    this.games.splice(gameIndex, 1);
  }

  public async getGamesMethods(game_id: string): Promise<GamesMethods[]> {
    const gameIndex = this.games.findIndex(game => game.id === game_id);

    return this.games[gameIndex].game_methods;
  }

  public async addGamesMethods(
    game: Game,
    method_ids: string[],
  ): Promise<Game> {
    const gameIndex = this.games.findIndex(
      iterableGame => iterableGame.id === game.id,
    );

    method_ids.forEach(method_id => {
      const gamesMethods = new GamesMethods();

      Object.assign(gamesMethods, {
        id: uuid(),
        method_id,
        game_id: game.id,
      });

      this.games[gameIndex].game_methods.push(gamesMethods);
    });

    return this.games[gameIndex];
  }

  public async removeGamesMethods(
    game: Game,
    method_ids: string[],
  ): Promise<Game> {
    const gameIndex = this.games.findIndex(
      iterableGame => iterableGame.id === game.id,
    );

    method_ids.forEach(method_id => {
      const methodIndex = this.games[gameIndex].game_methods.findIndex(
        games_methods => games_methods.method_id === method_id,
      );

      if (methodIndex >= 0) {
        this.games[gameIndex].game_methods.splice(methodIndex, 1);
      }
    });

    return this.games[gameIndex];
  }
}

export default FakeGamesRepository;
