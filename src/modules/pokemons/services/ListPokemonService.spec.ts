import FakePokemonsRepository from '../repositories/fakes/FakePokemonsRepository';

import ListPokemonsService from './ListPokemonsService';

describe('ListPokemons', () => {
  it('should be able to list all pokémons', async () => {
    const fakePokemonsRepository = new FakePokemonsRepository();

    const listPokemons = new ListPokemonsService(fakePokemonsRepository);

    await fakePokemonsRepository.create({
      name: 'Bulbasaur',
      pokedex_number: 1,
    });

    await fakePokemonsRepository.create({
      name: 'Ivysaur',
      pokedex_number: 2,
    });

    await fakePokemonsRepository.create({
      name: 'Venusaur',
      pokedex_number: 3,
    });

    const pokemons = await listPokemons.execute({});

    expect(pokemons.length).toBe(3);
  });

  it('should be able to filter pokémons by name', async () => {
    const fakePokemonsRepository = new FakePokemonsRepository();

    const listPokemons = new ListPokemonsService(fakePokemonsRepository);

    await fakePokemonsRepository.create({
      name: 'Bulbasaur',
      pokedex_number: 1,
    });

    await fakePokemonsRepository.create({
      name: 'Ivysaur',
      pokedex_number: 2,
    });

    await fakePokemonsRepository.create({
      name: 'Charmander',
      pokedex_number: 4,
    });

    await fakePokemonsRepository.create({
      name: 'Charmeleon',
      pokedex_number: 5,
    });

    const pokemons = await listPokemons.execute({
      name: 'charm',
    });

    expect(pokemons.length).toBe(2);
  });

  it('should be able to filter pokémon by pokédex number', async () => {
    const fakePokemonsRepository = new FakePokemonsRepository();

    const listPokemons = new ListPokemonsService(fakePokemonsRepository);

    await fakePokemonsRepository.create({
      name: 'Bulbasaur',
      pokedex_number: 1,
    });

    await fakePokemonsRepository.create({
      name: 'Ivysaur',
      pokedex_number: 2,
    });

    await fakePokemonsRepository.create({
      name: 'Venusaur',
      pokedex_number: 3,
    });

    const pokemons = await listPokemons.execute({
      pokedex_number: 2,
    });

    expect(pokemons.length).toBe(1);
  });
});
