import FakeGamesRepository from '../repositories/fakes/FakeGamesRepository';

import ListGamesService from './ListGamesService';

describe('ListGamesService', () => {
  it('should be able to list all games', async () => {
    const fakeGamesRepository = new FakeGamesRepository();

    const listGames = new ListGamesService(fakeGamesRepository);

    await fakeGamesRepository.create({
      name: 'Ultra Moon',
      generation_number: 7,
    });

    await fakeGamesRepository.create({
      name: 'Shield',
      generation_number: 8,
    });

    const games = await listGames.execute({});

    expect(games.length).toBe(2);
  });

  it('should be able to filter games by name', async () => {
    const fakeGamesRepository = new FakeGamesRepository();

    const listGames = new ListGamesService(fakeGamesRepository);

    await fakeGamesRepository.create({
      name: 'Ultra Moon',
      generation_number: 7,
    });

    await fakeGamesRepository.create({
      name: 'Shield',
      generation_number: 8,
    });

    const games = await listGames.execute({
      name: 'ultra',
    });

    expect(games.length).toBe(1);
  });

  it('should be able to filter games by generation number', async () => {
    const fakeGamesRepository = new FakeGamesRepository();

    const listGames = new ListGamesService(fakeGamesRepository);

    await fakeGamesRepository.create({
      name: 'Ultra Moon',
      generation_number: 7,
    });

    await fakeGamesRepository.create({
      name: 'Shield',
      generation_number: 8,
    });

    const games = await listGames.execute({
      generation_number: 8,
    });

    expect(games.length).toBe(1);
  });
});
