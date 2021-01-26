import AppError from '@shared/errors/AppError';

import FakeLocationsRepository from '../repositories/fakes/FakeLocationsRepository';

import CreateLocationService from './CreateLocationService';

describe('CreateLocation', () => {
  it('should be able to create a location', async () => {
    const fakeLocationsRepository = new FakeLocationsRepository();

    const createLocation = new CreateLocationService(fakeLocationsRepository);

    const location = await createLocation.execute({
      name: 'Route 1',
    });

    expect(location).toHaveProperty('id');
    expect(location.name).toBe('Route 1');
  });

  it('should not be able to create a location with the same name of another', async () => {
    const fakeLocationsRepository = new FakeLocationsRepository();

    const createLocation = new CreateLocationService(fakeLocationsRepository);

    await fakeLocationsRepository.create({
      name: 'Route 1',
    });

    expect(
      createLocation.execute({
        name: 'route 1',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
