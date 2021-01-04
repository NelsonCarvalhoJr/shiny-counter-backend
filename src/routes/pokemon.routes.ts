import Router from 'express';

import ListPokemonsService from '../services/ListPokemonsService';
import CreatePokemonService from '../services/CreatePokemonService';
import DeletePokemonService from '../services/DeletePokemonService';
import UpdatePokemonService from '../services/UpdatePokemonService';

const pokemonRouter = Router();

pokemonRouter.get('/', async (request, response) => {
  const { name } = request.query;

  const parsedName = name as string;

  const listPokemons = new ListPokemonsService();

  const pokemons = await listPokemons.execute({ name: parsedName });

  return response.json(pokemons);
});

pokemonRouter.post('/', async (request, response) => {
  try {
    const { name } = request.body;

    const createPokemon = new CreatePokemonService();

    const pokemon = await createPokemon.execute({ name });

    return response.json(pokemon);
  } catch (error) {
    return response.status(400).json({ error: error.message });
  }
});

pokemonRouter.put('/:id', async (request, response) => {
  try {
    const { id } = request.params;

    const { name } = request.body;

    const updatePokemon = new UpdatePokemonService();

    const pokemon = await updatePokemon.execute({ id, name });

    return response.json(pokemon);
  } catch (error) {
    return response.status(400).json({ error: error.message });
  }
});

pokemonRouter.delete('/:id', async (request, response) => {
  try {
    const { id } = request.params;

    const deletePokemon = new DeletePokemonService();

    await deletePokemon.execute({ id });

    return response.status(204).send();
  } catch (error) {
    return response.status(400).json({ error: error.message });
  }
});

export default pokemonRouter;
