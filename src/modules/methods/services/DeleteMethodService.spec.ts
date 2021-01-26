import AppError from '@shared/errors/AppError';

import FakeMethodsRepository from '../repositories/fakes/FakeMethodsRepository';

import DeleteMethodService from './DeleteMethodService';

describe('DeleteMethod', () => {
  it('should be able to delete a method', async () => {
    const fakeMethodsRepository = new FakeMethodsRepository();

    const deleteMethod = new DeleteMethodService(fakeMethodsRepository);

    const deleteFunction = jest.spyOn(fakeMethodsRepository, 'delete');

    const method = await fakeMethodsRepository.create({
      name: 'Masuda',
    });

    await deleteMethod.execute({
      id: method.id,
    });

    expect(deleteFunction).toHaveBeenCalledWith(method.id);
  });

  it('should not be able to delete a non-existing method', async () => {
    const fakeMethodsRepository = new FakeMethodsRepository();

    const deleteMethod = new DeleteMethodService(fakeMethodsRepository);

    expect(
      deleteMethod.execute({
        id: 'non-existing-method',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
