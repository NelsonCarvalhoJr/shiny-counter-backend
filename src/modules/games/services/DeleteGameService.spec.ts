import AppError from '@shared/errors/AppError';

import FakeGamesRepository from '../repositories/fakes/FakeGamesRepository';

import DeleteGameService from './DeleteGameService';

describe('DeleteGame', () => {
  it('should be able to delete a game', async () => {
    const fakeGamesRepository = new FakeGamesRepository();

    const deleteGame = new DeleteGameService(fakeGamesRepository);

    const deleteFunction = jest.spyOn(fakeGamesRepository, 'delete');

    const game = await fakeGamesRepository.create({
      name: 'Sword',
      generation_number: 8,
    });

    await deleteGame.execute({
      id: game.id,
    });

    expect(deleteFunction).toHaveBeenCalledWith(game.id);
  });

  it('sould not be able to delete a non-existent game', async () => {
    const fakeGamesRepository = new FakeGamesRepository();

    const deleteGame = new DeleteGameService(fakeGamesRepository);

    expect(
      deleteGame.execute({
        id: 'non-existent-game',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
