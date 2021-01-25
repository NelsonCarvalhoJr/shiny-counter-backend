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
});
