import AppError from '@shared/errors/AppError';

import FakePokemonsRepository from '../repositories/fakes/FakePokemonsRepository';

import DeletePokemonService from './DeletePokemonService';

describe('DeletePokemon', () => {
  it('should be able to delete a pokémon', async () => {
    const fakePokemonsRepository = new FakePokemonsRepository();

    const deletePokemon = new DeletePokemonService(fakePokemonsRepository);

    const deleteFunction = jest.spyOn(fakePokemonsRepository, 'delete');

    const pokemon = await fakePokemonsRepository.create({
      name: 'Bulbasaur',
      pokedex_number: 1,
    });

    await deletePokemon.execute({
      id: pokemon.id,
    });

    expect(deleteFunction).toHaveBeenCalledWith(pokemon.id);
  });

  it('should not be able to delete a non-existing pokémon', async () => {
    const fakePokemonsRepository = new FakePokemonsRepository();

    const deletePokemon = new DeletePokemonService(fakePokemonsRepository);

    expect(
      deletePokemon.execute({
        id: 'non-existing-pokemon',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
