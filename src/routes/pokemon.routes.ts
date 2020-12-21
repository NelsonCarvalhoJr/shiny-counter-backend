import Router from 'express';
import { v4 as uuid } from 'uuid';

import PokemonsRepository from '../repositories/PokemonsRepository';

import CreatePokemonService from '../services/CreatePokemonService';
import DeletePokemonService from '../services/DeletePokemonService';
import UpdatePokemonService from '../services/UpdatePokemonService';

const pokemonRouter = Router();
const pokemonsRepository = new PokemonsRepository();

pokemonRouter.get('/', (request, response) => {
  const { name } = request.query;

  const parsedName = name as string;

  let pokemon = [];

  if (parsedName) {
    pokemon = pokemonsRepository.findAllByName(parsedName);
  } else {
    pokemon = pokemonsRepository.all();
  }

  return response.json(pokemon);
});

pokemonRouter.post('/', (request, response) => {
  try {
    const { name } = request.body;

    const createPokemon = new CreatePokemonService(pokemonsRepository);

    const pokemon = createPokemon.execute({ name });

    return response.json(pokemon);
  } catch (error) {
    return response.status(400).json({ error: error.message });
  }
});

pokemonRouter.put('/:id', (request, response) => {
  try {
    const { id } = request.params;

    const { name } = request.body;

    const updatePokemon = new UpdatePokemonService(pokemonsRepository);

    const pokemon = updatePokemon.execute({ id, name });

    return response.json(pokemon);
  } catch (error) {
    return response.status(400).json({ error: error.message });
  }
});

pokemonRouter.delete('/:id', (request, response) => {
  try {
    const { id } = request.params;

    const deletePokemon = new DeletePokemonService(pokemonsRepository);

    deletePokemon.execute({ id });

    return response.status(204).send();
  } catch (error) {
    return response.status(400).json({ error: error.message });
  }
});

export default pokemonRouter;
