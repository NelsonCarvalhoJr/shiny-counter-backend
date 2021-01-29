import AppError from '@shared/errors/AppError';

import FakeGamesRepository from '../repositories/fakes/FakeGamesRepository';

import UpdateGameService from './UpdateGameService';

describe('UpdateGame', () => {
  it('should be able to show a game', async () => {
    const fakeGamesRepository = new FakeGamesRepository();

    const updateGame = new UpdateGameService(fakeGamesRepository);

    const game = await fakeGamesRepository.create({
      name: 'Sword',
      generation_number: 8,
    });

    const gameFound = await updateGame.execute({
      id: game.id,
      name: 'Ultra Sun',
      generation_number: 7,
    });

    expect(gameFound.id).toBe(game.id);
    expect(gameFound.name).toBe(game.name);
    expect(gameFound.generation_number).toBe(game.generation_number);
  });

  it("sould not be able to update the game's name to a name from another", async () => {
    const fakeGamesRepository = new FakeGamesRepository();

    const updateGame = new UpdateGameService(fakeGamesRepository);

    const game = await fakeGamesRepository.create({
      name: 'Sword',
      generation_number: 8,
    });

    await fakeGamesRepository.create({
      name: 'Ultra Sun',
      generation_number: 7,
    });

    expect(
      updateGame.execute({
        id: game.id,
        name: 'ultra sun',
        generation_number: 7,
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('sould not be able to update a non-existent game', async () => {
    const fakeGamesRepository = new FakeGamesRepository();

    const updateGame = new UpdateGameService(fakeGamesRepository);

    expect(
      updateGame.execute({
        id: 'non-existent-game',
        name: 'Ultra Sun',
        generation_number: 7,
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
