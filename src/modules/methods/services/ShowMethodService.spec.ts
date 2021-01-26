import AppError from '@shared/errors/AppError';

import FakeMethodsRepository from '../repositories/fakes/FakeMethodsRepository';

import ShowMethodService from './ShowMethodService';

describe('ShowMethod', () => {
  it('should be show a methods', async () => {
    const fakeMethodsRepository = new FakeMethodsRepository();

    const showMethod = new ShowMethodService(fakeMethodsRepository);

    const method = await fakeMethodsRepository.create({
      name: 'Masuda',
    });

    const findMethod = await showMethod.execute({
      id: method.id,
    });

    expect(findMethod.name).toBe('Masuda');
  });

  it('should not be able to show a non-existent method', async () => {
    const fakeMethodsRepository = new FakeMethodsRepository();

    const showMethod = new ShowMethodService(fakeMethodsRepository);

    expect(
      showMethod.execute({
        id: 'non-existent-method',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
