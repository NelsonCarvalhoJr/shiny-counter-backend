import AppError from '@shared/errors/AppError';

import FakePokemonsRepository from '../repositories/fakes/FakePokemonsRepository';

import ShowPokemonService from './ShowPokemonService';

describe('ShowPokemon', () => {
  it('should be able to show a pokémon', async () => {
    const fakePokemonsRepository = new FakePokemonsRepository();

    const showPokemon = new ShowPokemonService(fakePokemonsRepository);

    const pokemon = await fakePokemonsRepository.create({
      name: 'Bulbasaur',
      pokedex_number: 1,
    });

    const findPokemon = await showPokemon.execute({
      id: pokemon.id,
    });

    expect(findPokemon.name).toBe('Bulbasaur');
    expect(findPokemon.pokedex_number).toBe(1);
  });

  it('should not be able to show a non-existing pokémon', async () => {
    const fakePokemonsRepository = new FakePokemonsRepository();

    const showPokemon = new ShowPokemonService(fakePokemonsRepository);

    expect(
      showPokemon.execute({
        id: 'non-existing-pokemon',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
