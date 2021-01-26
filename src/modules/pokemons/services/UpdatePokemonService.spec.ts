import AppError from '@shared/errors/AppError';

import FakePokemonsRepository from '../repositories/fakes/FakePokemonsRepository';

import UpdatePokemonService from './UpdatePokemonService';

describe('UpdatePokemon', () => {
  it('should be able to update a pokémon', async () => {
    const fakePokemonsRepository = new FakePokemonsRepository();

    const updatePokemon = new UpdatePokemonService(fakePokemonsRepository);

    const pokemon = await fakePokemonsRepository.create({
      name: 'Ivysaur',
      pokedex_number: 2,
    });

    const updatedPokemon = await updatePokemon.execute({
      id: pokemon.id,
      name: 'Bulbasaur',
      pokedex_number: 1,
    });

    expect(updatedPokemon.name).toBe('Bulbasaur');
    expect(updatedPokemon.pokedex_number).toBe(1);
  });

  it("should not be able to update the pokémon's name for a name of another", async () => {
    const fakePokemonsRepository = new FakePokemonsRepository();

    const updatePokemon = new UpdatePokemonService(fakePokemonsRepository);

    const pokemon = await fakePokemonsRepository.create({
      name: 'Bulbasaur',
      pokedex_number: 1,
    });

    await fakePokemonsRepository.create({
      name: 'Ivysaur',
      pokedex_number: 2,
    });

    expect(
      updatePokemon.execute({
        id: pokemon.id,
        name: 'ivysaur',
        pokedex_number: 1,
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it("should not be able to update the pokémon's pokédex number for a pokédex number of another", async () => {
    const fakePokemonsRepository = new FakePokemonsRepository();

    const updatePokemon = new UpdatePokemonService(fakePokemonsRepository);

    const pokemon = await fakePokemonsRepository.create({
      name: 'Bulbasaur',
      pokedex_number: 1,
    });

    await fakePokemonsRepository.create({
      name: 'Ivysaur',
      pokedex_number: 2,
    });

    expect(
      updatePokemon.execute({
        id: pokemon.id,
        name: 'Bulbasaur',
        pokedex_number: 2,
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to update a non-existing pokémon', async () => {
    const fakePokemonsRepository = new FakePokemonsRepository();

    const updatePokemon = new UpdatePokemonService(fakePokemonsRepository);

    expect(
      updatePokemon.execute({
        id: 'non-existing-pokemon',
        name: 'Bulbasaur',
        pokedex_number: 1,
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
