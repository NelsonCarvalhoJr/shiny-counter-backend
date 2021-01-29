import AppError from '@shared/errors/AppError';

import FakeGamesRepository from '../repositories/fakes/FakeGamesRepository';

import ShowGameService from './ShowGameService';

describe('ShowGame', () => {
  it('should be able to show a game', async () => {
    const fakeGamesRepository = new FakeGamesRepository();

    const showGame = new ShowGameService(fakeGamesRepository);

    const game = await fakeGamesRepository.create({
      name: 'Sword',
      generation_number: 8,
    });

    const gameFound = await showGame.execute({
      id: game.id,
    });

    expect(gameFound.id).toBe(game.id);
    expect(gameFound.name).toBe(game.name);
    expect(gameFound.generation_number).toBe(game.generation_number);
  });

  it('sould not be able to show a non-existent game', async () => {
    const fakeGamesRepository = new FakeGamesRepository();

    const showGame = new ShowGameService(fakeGamesRepository);

    expect(
      showGame.execute({
        id: 'non-existent-game',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
