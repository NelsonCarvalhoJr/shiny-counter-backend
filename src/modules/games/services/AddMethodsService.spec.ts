import AppError from '@shared/errors/AppError';

import FakeMethodsRepository from '@modules/methods/repositories/fakes/FakeMethodsRepository';
import FakeGamesRepository from '../repositories/fakes/FakeGamesRepository';

import AddMethodsService from './AddMethodsService';

describe('AddMethods', () => {
  it('should be able to add methods in a game', async () => {
    const fakeGamesRepository = new FakeGamesRepository();
    const fakeMethodsRepository = new FakeMethodsRepository();

    const addMethods = new AddMethodsService(
      fakeGamesRepository,
      fakeMethodsRepository,
    );

    const game = await fakeGamesRepository.create({
      name: 'Sword',
      generation_number: 8,
    });

    const masudaMethod = await fakeMethodsRepository.create({
      name: 'Masuda',
    });

    const resetMethod = await fakeMethodsRepository.create({
      name: 'Reset',
    });

    const methodsAdded = await addMethods.execute({
      game_id: game.id,
      method_id: [masudaMethod.id, resetMethod.id],
    });

    expect(methodsAdded.id).toBe(game.id);
    expect(methodsAdded.name).toBe(game.name);
    expect(methodsAdded.generation_number).toBe(game.generation_number);
    expect(methodsAdded.game_methods.length).toBe(2);
  });

  it('should not be able to add the same method in a game', async () => {
    const fakeGamesRepository = new FakeGamesRepository();
    const fakeMethodsRepository = new FakeMethodsRepository();

    const addMethods = new AddMethodsService(
      fakeGamesRepository,
      fakeMethodsRepository,
    );

    const method = await fakeMethodsRepository.create({
      name: 'masuda',
    });

    const game = await fakeGamesRepository.create({
      name: 'Sword',
      generation_number: 8,
      game_methods: [{ method_id: method.id }],
    });

    expect(
      addMethods.execute({
        game_id: game.id,
        method_id: [method.id],
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to a method two times in a game', async () => {
    const fakeGamesRepository = new FakeGamesRepository();
    const fakeMethodsRepository = new FakeMethodsRepository();

    const addMethods = new AddMethodsService(
      fakeGamesRepository,
      fakeMethodsRepository,
    );

    const method = await fakeMethodsRepository.create({
      name: 'masuda',
    });

    const game = await fakeGamesRepository.create({
      name: 'Sword',
      generation_number: 8,
    });

    expect(
      addMethods.execute({
        game_id: game.id,
        method_id: [method.id, method.id],
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to add a non-existent method in a game', async () => {
    const fakeGamesRepository = new FakeGamesRepository();
    const fakeMethodsRepository = new FakeMethodsRepository();

    const addMethods = new AddMethodsService(
      fakeGamesRepository,
      fakeMethodsRepository,
    );

    const game = await fakeGamesRepository.create({
      name: 'Sword',
      generation_number: 8,
    });

    expect(
      addMethods.execute({
        game_id: game.id,
        method_id: ['non-existent-method'],
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to add a method in a non-existent-game', async () => {
    const fakeGamesRepository = new FakeGamesRepository();
    const fakeMethodsRepository = new FakeMethodsRepository();

    const addMethods = new AddMethodsService(
      fakeGamesRepository,
      fakeMethodsRepository,
    );

    const method = await fakeMethodsRepository.create({
      name: 'masuda',
    });

    expect(
      addMethods.execute({
        game_id: 'non-existent-game',
        method_id: [method.id],
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
