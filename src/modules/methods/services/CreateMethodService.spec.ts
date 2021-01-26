import AppError from '@shared/errors/AppError';

import FakeMethodsRepository from '../repositories/fakes/FakeMethodsRepository';

import CreateMethodService from './CreateMethodService';

describe('CreateMethod', () => {
  it('should be able to create a method', async () => {
    const fakeMethodsRepository = new FakeMethodsRepository();

    const createMethod = new CreateMethodService(fakeMethodsRepository);

    const method = await createMethod.execute({
      name: 'Masuda',
    });

    expect(method.name).toBe('Masuda');
  });

  it('should not be able to create a method with the same name of another', async () => {
    const fakeMethodsRepository = new FakeMethodsRepository();

    const createMethod = new CreateMethodService(fakeMethodsRepository);

    await fakeMethodsRepository.create({
      name: 'Masuda',
    });

    expect(
      createMethod.execute({
        name: 'Masuda',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
