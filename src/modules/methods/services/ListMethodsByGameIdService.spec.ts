import FakeMethodsRepository from '../repositories/fakes/FakeMethodsRepository';

import ListMethodsByGameIdService from './ListMethodsByGameIdService';

describe('ListMethodsByGameId', () => {
  it('should be list all methods by game id', async () => {
    const fakeMethodsRepository = new FakeMethodsRepository();

    const listMethodsByGameId = new ListMethodsByGameIdService(
      fakeMethodsRepository,
    );

    const masudaMethod = await fakeMethodsRepository.create({
      name: 'Masuda',
    });

    const resetMethod = await fakeMethodsRepository.create({
      name: 'Reset',
    });

    await fakeMethodsRepository.create({
      name: 'Dynamax Adventure',
    });

    await fakeMethodsRepository.addGamesMethods(masudaMethod, ['a-game-id-1']);

    await fakeMethodsRepository.addGamesMethods(resetMethod, ['a-game-id-1']);

    const methods = await listMethodsByGameId.execute({
      game_id: 'a-game-id-1',
    });

    expect(methods.length).toBe(2);
  });

  it('should be filter methods of a game id by name', async () => {
    const fakeMethodsRepository = new FakeMethodsRepository();

    const listMethodsByGameId = new ListMethodsByGameIdService(
      fakeMethodsRepository,
    );

    const masudaMethod = await fakeMethodsRepository.create({
      name: 'Masuda',
    });

    const resetMethod = await fakeMethodsRepository.create({
      name: 'Reset',
    });

    await fakeMethodsRepository.create({
      name: 'Dynamax Adventure',
    });

    await fakeMethodsRepository.addGamesMethods(masudaMethod, ['a-game-id-1']);

    await fakeMethodsRepository.addGamesMethods(resetMethod, ['a-game-id-1']);

    const methods = await listMethodsByGameId.execute({
      game_id: 'a-game-id-1',
      name: 'reset',
    });

    expect(methods.length).toBe(1);
  });
});
