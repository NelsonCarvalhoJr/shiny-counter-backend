import AppError from '@shared/errors/AppError';

import FakeLocationsRepository from '../repositories/fakes/FakeLocationsRepository';

import ShowLocationService from './ShowLocationService';

describe('ShowLocation', () => {
  it('should be able to show a location', async () => {
    const fakeLocationsRepository = new FakeLocationsRepository();

    const showLocation = new ShowLocationService(fakeLocationsRepository);

    const location = await fakeLocationsRepository.create({
      name: 'Route 1',
    });

    const findLocation = await showLocation.execute({
      id: location.id,
    });

    expect(findLocation.name).toBe('Route 1');
  });

  it('should not be able to show a non-existing location', async () => {
    const fakeLocationsRepository = new FakeLocationsRepository();

    const showLocation = new ShowLocationService(fakeLocationsRepository);

    expect(
      showLocation.execute({
        id: 'non-exisitng-id',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
