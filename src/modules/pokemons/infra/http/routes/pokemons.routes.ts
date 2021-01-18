import Router from 'express';

import PokemonsRepository from '@modules/pokemons/infra/typeorm/repositories/PokemonsRepository';

import CreatePokemonService from '@modules/pokemons/services/CreatePokemonService';
import UpdatePokemonService from '@modules/pokemons/services/UpdatePokemonService';
import DeletePokemonService from '@modules/pokemons/services/DeletePokemonService';

const pokemonsRouter = Router();

pokemonsRouter.get('/', async (request, response) => {
  const { name, pokedex_number } = request.query;

  const parsedName = name as string;
  const parsedPokedexNumber = Number(pokedex_number);

  const pokemonsRepository = new PokemonsRepository();

  const pokemons = await pokemonsRepository.all({
    name: parsedName,
    pokedex_number: parsedPokedexNumber,
    order: {
      pokedex_number: 'ASC',
    },
  });

  return response.json(pokemons);
});

pokemonsRouter.post('/', async (request, response) => {
  const { name, pokedex_number } = request.body;

  const pokemonsRepository = new PokemonsRepository();
  const createPokemon = new CreatePokemonService(pokemonsRepository);

  const pokemon = await createPokemon.execute({ name, pokedex_number });

  return response.json(pokemon);
});

pokemonsRouter.put('/:id', async (request, response) => {
  const { id } = request.params;

  const { name, pokedex_number } = request.body;

  const pokemonsRepository = new PokemonsRepository();
  const updatePokemon = new UpdatePokemonService(pokemonsRepository);

  const pokemon = await updatePokemon.execute({ id, name, pokedex_number });

  return response.json(pokemon);
});

pokemonsRouter.delete('/:id', async (request, response) => {
  const { id } = request.params;

  const pokemonsRepository = new PokemonsRepository();
  const deletePokemon = new DeletePokemonService(pokemonsRepository);

  await deletePokemon.execute({ id });

  return response.status(204).send();
});

export default pokemonsRouter;
