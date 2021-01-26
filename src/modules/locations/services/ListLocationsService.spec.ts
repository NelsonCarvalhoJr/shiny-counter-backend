import FakeLocationsRepository from '../repositories/fakes/FakeLocationsRepository';

import ListLocationsService from './ListLocationsService';

describe('ListLocations', () => {
  it('should be able to list all locations', async () => {
    const fakeLocationsRepository = new FakeLocationsRepository();

    const listLocation = new ListLocationsService(fakeLocationsRepository);

    await fakeLocationsRepository.create({
      name: 'Route 1',
    });

    await fakeLocationsRepository.create({
      name: 'Route 2',
    });

    await fakeLocationsRepository.create({
      name: 'Route 3',
    });

    const locations = await listLocation.execute({});

    expect(locations.length).toBe(3);
  });

  it('should be able to filter all locations by name', async () => {
    const fakeLocationsRepository = new FakeLocationsRepository();

    const listLocation = new ListLocationsService(fakeLocationsRepository);

    await fakeLocationsRepository.create({
      name: "Giant's Cap",
    });

    await fakeLocationsRepository.create({
      name: "Giant's Seat",
    });

    await fakeLocationsRepository.create({
      name: 'Lake of outrage',
    });

    const locations = await listLocation.execute({
      name: "giant's",
    });

    expect(locations.length).toBe(2);
  });
});
