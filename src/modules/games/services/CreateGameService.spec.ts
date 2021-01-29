import AppError from '@shared/errors/AppError';

import FakeMethodsRepository from '@modules/methods/repositories/fakes/FakeMethodsRepository';
import FakeGamesRepository from '../repositories/fakes/FakeGamesRepository';

import CreateGameService from './CreateGameService';

describe('CreateGame', () => {
  it('should be able to create a game', async () => {
    const fakeGamesRepository = new FakeGamesRepository();
    const fakeMethodsRepository = new FakeMethodsRepository();

    const createGame = new CreateGameService(
      fakeGamesRepository,
      fakeMethodsRepository,
    );

    const game = await createGame.execute({
      name: 'sword',
      generation_number: 8,
    });

    expect(game).toHaveProperty('id');
    expect(game.name).toBe('sword');
    expect(game.generation_number).toBe(8);
  });

  it('should be able to create a game with methods', async () => {
    const fakeGamesRepository = new FakeGamesRepository();
    const fakeMethodsRepository = new FakeMethodsRepository();

    const createGame = new CreateGameService(
      fakeGamesRepository,
      fakeMethodsRepository,
    );

    const masudaMethod = await fakeMethodsRepository.create({
      name: 'masuda',
    });

    const resetMethod = await fakeMethodsRepository.create({
      name: 'reset',
    });

    const game = await createGame.execute({
      name: 'sword',
      generation_number: 8,
      method_id: [masudaMethod.id, resetMethod.id],
    });

    expect(game).toHaveProperty('id');
    expect(game.name).toBe('sword');
    expect(game.generation_number).toBe(8);
    expect(game.game_methods.length).toBe(2);
  });

  it('should not be able to create two games with the same name', async () => {
    const fakeGamesRepository = new FakeGamesRepository();
    const fakeMethodsRepository = new FakeMethodsRepository();

    const createGame = new CreateGameService(
      fakeGamesRepository,
      fakeMethodsRepository,
    );

    await fakeGamesRepository.create({
      name: 'sword',
      generation_number: 8,
    });

    expect(
      createGame.execute({
        name: 'sword',
        generation_number: 8,
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to create a game with two methods equals', async () => {
    const fakeGamesRepository = new FakeGamesRepository();
    const fakeMethodsRepository = new FakeMethodsRepository();

    const createGame = new CreateGameService(
      fakeGamesRepository,
      fakeMethodsRepository,
    );

    const masudaMethod = await fakeMethodsRepository.create({
      name: 'masuda',
    });

    expect(
      createGame.execute({
        name: 'sword',
        generation_number: 8,
        method_id: [masudaMethod.id, masudaMethod.id],
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to create a game with a non-existent method', async () => {
    const fakeGamesRepository = new FakeGamesRepository();
    const fakeMethodsRepository = new FakeMethodsRepository();

    const createGame = new CreateGameService(
      fakeGamesRepository,
      fakeMethodsRepository,
    );

    expect(
      createGame.execute({
        name: 'sword',
        generation_number: 8,
        method_id: ['non-existent-method'],
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
