import FakeMethodsRepository from '../repositories/fakes/FakeMethodsRepository';

import ListMethodsService from './ListMethodsService';

describe('ListMethods', () => {
  it('should be list all methods', async () => {
    const fakeMethodsRepository = new FakeMethodsRepository();

    const listMethods = new ListMethodsService(fakeMethodsRepository);

    await fakeMethodsRepository.create({
      name: 'Masuda',
    });

    await fakeMethodsRepository.create({
      name: 'Soft Reset',
    });

    await fakeMethodsRepository.create({
      name: 'Dynamax Adventure',
    });

    const methods = await listMethods.execute({});

    expect(methods.length).toBe(3);
  });

  it('should be filter methods by name', async () => {
    const fakeMethodsRepository = new FakeMethodsRepository();

    const listMethods = new ListMethodsService(fakeMethodsRepository);

    await fakeMethodsRepository.create({
      name: 'Masuda',
    });

    await fakeMethodsRepository.create({
      name: 'Soft Reset',
    });

    await fakeMethodsRepository.create({
      name: 'Dynamax Adventure',
    });

    const methods = await listMethods.execute({
      name: 'soft',
    });

    expect(methods.length).toBe(1);
  });
});
