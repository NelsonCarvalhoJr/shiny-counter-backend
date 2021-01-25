import { v4 as uuid } from 'uuid';

import IPokemonsRepository from '@modules/pokemons/repositories/IPokemonsRepository';
import IFindAllPokemonsDTO from '@modules/pokemons/dtos/IFindAllPokemonsDTO';
import ICreatePokemonDTO from '@modules/pokemons/dtos/ICreatePokemonDTO';

import Pokemon from '../../infra/typeorm/entities/Pokemon';

class PokemonsRepository implements IPokemonsRepository {
  private pokemons: Pokemon[] = [];

  public async all({
    name = '',
    pokedex_number,
    order,
  }: IFindAllPokemonsDTO): Promise<Pokemon[]> {
    let filteredPokemons = this.pokemons.filter(pokemon =>
      pokemon.name.toLowerCase().includes(name.toLowerCase()),
    );

    if (pokedex_number) {
      filteredPokemons = filteredPokemons.filter(
        pokemon => pokemon.pokedex_number === pokedex_number,
      );
    }

    if (order) {
      const [field_name] = Object.keys(order);

      if (field_name === 'name') {
        filteredPokemons.sort((prev, next) => {
          if (prev[field_name].toLowerCase() < next[field_name].toLowerCase()) {
            return order[field_name] === 'ASC' ? -1 : 1;
          }
          if (prev[field_name].toLowerCase() > next[field_name].toLowerCase()) {
            return order[field_name] === 'ASC' ? 1 : -1;
          }
          return 0;
        });
      } else if (field_name === 'pokedex_number') {
        filteredPokemons.sort((prev, next) => {
          if (prev[field_name] < next[field_name]) {
            return order[field_name] === 'ASC' ? -1 : 1;
          }
          if (prev[field_name] > next[field_name]) {
            return order[field_name] === 'ASC' ? 1 : -1;
          }
          return 0;
        });
      }
    }

    return filteredPokemons;
  }

  public async findById(id: string): Promise<Pokemon | undefined> {
    const findPokemon = this.pokemons.find(pokemon => pokemon.id === id);

    return findPokemon;
  }

  public async findByName(name: string): Promise<Pokemon | undefined> {
    const findPokemon = this.pokemons.find(pokemon => pokemon.name === name);

    return findPokemon;
  }

  public async findByPokedexNumber(
    pokedex_number: number,
  ): Promise<Pokemon | undefined> {
    const findPokemon = this.pokemons.find(
      pokemon => pokemon.pokedex_number === pokedex_number,
    );

    return findPokemon;
  }

  public async create(pokemonData: ICreatePokemonDTO): Promise<Pokemon> {
    const pokemon = new Pokemon();

    Object.assign(pokemon, { id: uuid() }, pokemonData);

    return pokemon;
  }

  public async update(pokemon: Pokemon): Promise<Pokemon> {
    const findIndex = this.pokemons.findIndex(
      findPokemon => findPokemon.id === pokemon.id,
    );

    this.pokemons[findIndex] = pokemon;

    return this.pokemons[findIndex];
  }

  public async delete(id: string): Promise<void> {
    const findIndex = this.pokemons.findIndex(pokemon => pokemon.id === id);

    this.pokemons.splice(findIndex, 1);
  }
}

export default PokemonsRepository;
