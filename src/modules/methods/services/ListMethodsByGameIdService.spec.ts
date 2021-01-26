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
      name: 'Soft Reset',
    });

    await fakeMethodsRepository.create({
      name: 'Dynamax Adventure',
    });

    await fakeMethodsRepository.addGamesMethods(masudaMethod.id, 'a-game-id');

    await fakeMethodsRepository.addGamesMethods(resetMethod.id, 'a-game-id');

    const methods = await listMethodsByGameId.execute({
      game_id: 'a-game-id',
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
      name: 'Soft Reset',
    });

    await fakeMethodsRepository.create({
      name: 'Dynamax Adventure',
    });

    await fakeMethodsRepository.addGamesMethods(masudaMethod.id, 'a-game-id');

    await fakeMethodsRepository.addGamesMethods(resetMethod.id, 'a-game-id');

    const methods = await listMethodsByGameId.execute({
      game_id: 'a-game-id',
      name: 'soft',
    });

    expect(methods.length).toBe(1);
  });
});
