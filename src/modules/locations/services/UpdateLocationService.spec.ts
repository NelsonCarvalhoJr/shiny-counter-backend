import AppError from '@shared/errors/AppError';

import FakeLocationsRepository from '../repositories/fakes/FakeLocationsRepository';

import UpdateLocationService from './UpdateLocationService';

describe('UpdateLocation', () => {
  it('should be able to update a location', async () => {
    const fakeLocationsRepository = new FakeLocationsRepository();

    const updateLocation = new UpdateLocationService(fakeLocationsRepository);

    const location = await fakeLocationsRepository.create({
      name: 'Route 1',
    });

    const updatedLocation = await updateLocation.execute({
      id: location.id,
      name: 'Route 2',
    });

    expect(updatedLocation.name).toBe('Route 2');
  });

  it("should not be able to update the locations's name for a name of another", async () => {
    const fakeLocationsRepository = new FakeLocationsRepository();

    const updateLocation = new UpdateLocationService(fakeLocationsRepository);

    const location = await fakeLocationsRepository.create({
      name: 'Route 1',
    });

    await fakeLocationsRepository.create({
      name: 'Route 2',
    });

    expect(
      updateLocation.execute({
        id: location.id,
        name: 'Route 2',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to update a non-exisiting location', async () => {
    const fakeLocationsRepository = new FakeLocationsRepository();

    const updateLocation = new UpdateLocationService(fakeLocationsRepository);

    expect(
      updateLocation.execute({
        id: 'non-exisitng-id',
        name: 'Route 1',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
