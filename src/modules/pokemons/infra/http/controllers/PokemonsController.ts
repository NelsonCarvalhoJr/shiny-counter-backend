import { Request, Response } from 'express';
import { container } from 'tsyringe';

import ListPokemonsService from '@modules/pokemons/services/ListPokemonsService';
import ShowPokemonService from '@modules/pokemons/services/ShowPokemonService';
import CreatePokemonService from '@modules/pokemons/services/CreatePokemonService';
import UpdatePokemonService from '@modules/pokemons/services/UpdatePokemonService';
import DeletePokemonService from '@modules/pokemons/services/DeletePokemonService';

class PokemonsController {
  async index(request: Request, response: Response): Promise<Response> {
    const { name, pokedex_number } = request.query;

    const parsedName = name as string;
    const parsedPokedexNumber = Number(pokedex_number);

    const listPokemons = container.resolve(ListPokemonsService);

    const pokemons = await listPokemons.execute({
      name: parsedName,
      pokedex_number: parsedPokedexNumber,
    });

    return response.json(pokemons);
  }

  async show(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const showPokemon = container.resolve(ShowPokemonService);

    const pokemon = await showPokemon.execute({
      id,
    });

    return response.json(pokemon);
  }

  async create(request: Request, response: Response): Promise<Response> {
    const { name, pokedex_number } = request.body;

    const createPokemon = container.resolve(CreatePokemonService);

    const pokemon = await createPokemon.execute({ name, pokedex_number });

    return response.json(pokemon);
  }

  async update(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const { name, pokedex_number } = request.body;

    const updatePokemon = container.resolve(UpdatePokemonService);

    const pokemon = await updatePokemon.execute({ id, name, pokedex_number });

    return response.json(pokemon);
  }

  async delete(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const deletePokemon = container.resolve(DeletePokemonService);

    await deletePokemon.execute({ id });

    return response.status(204).send();
  }
}

export default PokemonsController;
