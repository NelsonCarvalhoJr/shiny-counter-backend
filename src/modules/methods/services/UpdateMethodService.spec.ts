import AppError from '@shared/errors/AppError';

import FakeMethodsRepository from '../repositories/fakes/FakeMethodsRepository';

import UpdateMethodService from './UpdateMethodService';

describe('UpdateMethod', () => {
  it('should be show a methods', async () => {
    const fakeMethodsRepository = new FakeMethodsRepository();

    const updateMethod = new UpdateMethodService(fakeMethodsRepository);

    const method = await fakeMethodsRepository.create({
      name: 'Masuda',
    });

    const findMethod = await updateMethod.execute({
      id: method.id,
      name: 'Soft Reset',
    });

    expect(findMethod.name).toBe('Soft Reset');
  });

  it("should not be able to update the method's name to a name of another method", async () => {
    const fakeMethodsRepository = new FakeMethodsRepository();

    const updateMethod = new UpdateMethodService(fakeMethodsRepository);

    const method = await fakeMethodsRepository.create({
      name: 'Masuda',
    });

    await fakeMethodsRepository.create({
      name: 'Soft Reset',
    });

    expect(
      updateMethod.execute({
        id: method.id,
        name: 'soft reset',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to update a non-existent method', async () => {
    const fakeMethodsRepository = new FakeMethodsRepository();

    const updateMethod = new UpdateMethodService(fakeMethodsRepository);

    expect(
      updateMethod.execute({
        id: 'non-existent-method',
        name: 'Soft Reset',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
