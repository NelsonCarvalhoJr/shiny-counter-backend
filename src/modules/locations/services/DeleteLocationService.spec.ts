import AppError from '@shared/errors/AppError';

import FakeLocationsRepository from '../repositories/fakes/FakeLocationsRepository';

import DeleteLocationService from './DeleteLocationService';

describe('DeleteLocation', () => {
  it('should be able to delete a location', async () => {
    const fakeLocationsRepository = new FakeLocationsRepository();

    const deleteLocation = new DeleteLocationService(fakeLocationsRepository);

    const deleteFunction = jest.spyOn(fakeLocationsRepository, 'delete');

    const location = await fakeLocationsRepository.create({
      name: 'Route 1',
    });

    await deleteLocation.execute({
      id: location.id,
    });

    expect(deleteFunction).toHaveBeenCalledWith(location.id);
  });

  it('should not be able to delete a non-exisiting location', async () => {
    const fakeLocationsRepository = new FakeLocationsRepository();

    const deleteLocation = new DeleteLocationService(fakeLocationsRepository);

    expect(
      deleteLocation.execute({
        id: 'non-existing-location',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
