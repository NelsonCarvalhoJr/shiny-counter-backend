import AppError from '@shared/errors/AppError';

import FakeMethodsRepository from '@modules/methods/repositories/fakes/FakeMethodsRepository';
import FakeGamesRepository from '../repositories/fakes/FakeGamesRepository';

import RemoveMethodsService from './RemoveMethodsService';

describe('RemoveMethods', () => {
  it('should be able to remove methods in a game', async () => {
    const fakeGamesRepository = new FakeGamesRepository();
    const fakeMethodsRepository = new FakeMethodsRepository();

    const removeMethods = new RemoveMethodsService(
      fakeGamesRepository,
      fakeMethodsRepository,
    );

    const masudaMethod = await fakeMethodsRepository.create({
      name: 'Masuda',
    });

    const resetMethod = await fakeMethodsRepository.create({
      name: 'Reset',
    });

    const game = await fakeGamesRepository.create({
      name: 'Sword',
      generation_number: 8,
      game_methods: [
        {
          method_id: masudaMethod.id,
        },
        {
          method_id: resetMethod.id,
        },
      ],
    });

    const games = await removeMethods.execute({
      game_id: game.id,
      method_id: [masudaMethod.id, resetMethod.id],
    });

    expect(games.game_methods.length).toBe(0);
  });

  it('should not be able to remove a method from a non-existent game', async () => {
    const fakeGamesRepository = new FakeGamesRepository();
    const fakeMethodsRepository = new FakeMethodsRepository();

    const removeMethods = new RemoveMethodsService(
      fakeGamesRepository,
      fakeMethodsRepository,
    );

    const masudaMethod = await fakeMethodsRepository.create({
      name: 'Masuda',
    });

    const resetMethod = await fakeMethodsRepository.create({
      name: 'Reset',
    });

    expect(
      removeMethods.execute({
        game_id: 'non-existent-game',
        method_id: [masudaMethod.id, resetMethod.id],
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to remove a non-existent method in a game', async () => {
    const fakeGamesRepository = new FakeGamesRepository();
    const fakeMethodsRepository = new FakeMethodsRepository();

    const removeMethods = new RemoveMethodsService(
      fakeGamesRepository,
      fakeMethodsRepository,
    );

    const masudaMethod = await fakeMethodsRepository.create({
      name: 'Masuda',
    });

    const resetMethod = await fakeMethodsRepository.create({
      name: 'Reset',
    });

    const game = await fakeGamesRepository.create({
      name: 'Sword',
      generation_number: 8,
      game_methods: [
        {
          method_id: masudaMethod.id,
        },
        {
          method_id: resetMethod.id,
        },
      ],
    });

    expect(
      removeMethods.execute({
        game_id: game.id,
        method_id: ['non-existent-method'],
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to remove a method two times in a game', async () => {
    const fakeGamesRepository = new FakeGamesRepository();
    const fakeMethodsRepository = new FakeMethodsRepository();

    const removeMethods = new RemoveMethodsService(
      fakeGamesRepository,
      fakeMethodsRepository,
    );

    const masudaMethod = await fakeMethodsRepository.create({
      name: 'Masuda',
    });

    const resetMethod = await fakeMethodsRepository.create({
      name: 'Reset',
    });

    const game = await fakeGamesRepository.create({
      name: 'Sword',
      generation_number: 8,
      game_methods: [
        {
          method_id: masudaMethod.id,
        },
        {
          method_id: resetMethod.id,
        },
      ],
    });

    expect(
      removeMethods.execute({
        game_id: game.id,
        method_id: [masudaMethod.id, masudaMethod.id],
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it("should not be able to remove a method that isn't in a game", async () => {
    const fakeGamesRepository = new FakeGamesRepository();
    const fakeMethodsRepository = new FakeMethodsRepository();

    const removeMethods = new RemoveMethodsService(
      fakeGamesRepository,
      fakeMethodsRepository,
    );

    const masudaMethod = await fakeMethodsRepository.create({
      name: 'Masuda',
    });

    const resetMethod = await fakeMethodsRepository.create({
      name: 'Reset',
    });

    const game = await fakeGamesRepository.create({
      name: 'Sword',
      generation_number: 8,
      game_methods: [
        {
          method_id: resetMethod.id,
        },
      ],
    });

    expect(
      removeMethods.execute({
        game_id: game.id,
        method_id: [masudaMethod.id],
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
