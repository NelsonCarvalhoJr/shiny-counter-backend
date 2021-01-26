import AppError from '@shared/errors/AppError';

import FakePokemonsRepository from '../repositories/fakes/FakePokemonsRepository';

import CreatePokemonService from './CreatePokemonService';

describe('CreatePokemon', () => {
  it('should be able to create a pokémon', async () => {
    const fakePokemonsRepository = new FakePokemonsRepository();

    const createPokemon = new CreatePokemonService(fakePokemonsRepository);

    const pokemon = await createPokemon.execute({
      name: 'Bulbasaur',
      pokedex_number: 1,
    });

    expect(pokemon).toHaveProperty('id');
    expect(pokemon.name).toBe('Bulbasaur');
    expect(pokemon.pokedex_number).toBe(1);
  });

  it('should not be able to create a pokémon with the same name of another', async () => {
    const fakePokemonsRepository = new FakePokemonsRepository();

    const createPokemon = new CreatePokemonService(fakePokemonsRepository);

    await fakePokemonsRepository.create({
      name: 'Bulbasaur',
      pokedex_number: 1,
    });

    expect(
      createPokemon.execute({
        name: 'bulbasaur',
        pokedex_number: 2,
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to create a pokémon with the same number of another', async () => {
    const fakePokemonsRepository = new FakePokemonsRepository();

    const createPokemon = new CreatePokemonService(fakePokemonsRepository);

    await fakePokemonsRepository.create({
      name: 'Bulbasaur',
      pokedex_number: 1,
    });

    expect(
      createPokemon.execute({
        name: 'Charmander',
        pokedex_number: 1,
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
