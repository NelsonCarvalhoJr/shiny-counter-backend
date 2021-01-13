import Router from 'express';

import ListPokemonsService from '../services/ListPokemonsService';
import CreatePokemonService from '../services/CreatePokemonService';
import UpdatePokemonService from '../services/UpdatePokemonService';
import DeletePokemonService from '../services/DeletePokemonService';

const pokemonsRouter = Router();

pokemonsRouter.get('/', async (request, response) => {
  const { name, pokedex_number } = request.query;

  const parsedName = name as string;
  const parsedPokedexNumber = Number(pokedex_number);

  const listPokemons = new ListPokemonsService();

  const pokemons = await listPokemons.execute({
    name: parsedName,
    pokedex_number: parsedPokedexNumber,
  });

  return response.json(pokemons);
});

pokemonsRouter.post('/', async (request, response) => {
  const { name, pokedex_number } = request.body;

  const createPokemon = new CreatePokemonService();

  const pokemon = await createPokemon.execute({ name, pokedex_number });

  return response.json(pokemon);
});

pokemonsRouter.put('/:id', async (request, response) => {
  const { id } = request.params;

  const { name, pokedex_number } = request.body;

  const updatePokemon = new UpdatePokemonService();

  const pokemon = await updatePokemon.execute({ id, name, pokedex_number });

  return response.json(pokemon);
});

pokemonsRouter.delete('/:id', async (request, response) => {
  const { id } = request.params;

  const deletePokemon = new DeletePokemonService();

  await deletePokemon.execute({ id });

  return response.status(204).send();
});

export default pokemonsRouter;
