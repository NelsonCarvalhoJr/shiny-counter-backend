import { v4 as uuid } from 'uuid';

import IPokemonsRepository from '@modules/pokemons/repositories/IPokemonsRepository';
import IFindAllPokemonsDTO from '@modules/pokemons/dtos/IFindAllPokemonsDTO';
import ICreatePokemonDTO from '@modules/pokemons/dtos/ICreatePokemonDTO';

import Pokemon from '../../infra/typeorm/entities/Pokemon';

class FakePokemonsRepository implements IPokemonsRepository {
  private pokemons: Pokemon[] = [];

  public async all({
    name = '',
    pokedex_number,
  }: IFindAllPokemonsDTO): Promise<Pokemon[]> {
    let filteredPokemons = this.pokemons.filter(pokemon =>
      pokemon.name.toLowerCase().includes(name.toLowerCase()),
    );

    if (pokedex_number) {
      filteredPokemons = filteredPokemons.filter(
        pokemon => pokemon.pokedex_number === pokedex_number,
      );
    }

    return filteredPokemons;
  }

  public async findById(id: string): Promise<Pokemon | undefined> {
    const findPokemon = this.pokemons.find(pokemon => pokemon.id === id);

    return findPokemon;
  }

  public async findByName(name: string): Promise<Pokemon | undefined> {
    const findPokemon = this.pokemons.find(
      pokemon => pokemon.name.toLowerCase() === name.toLowerCase(),
    );

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

    this.pokemons.push(pokemon);

    return pokemon;
  }

  public async update(pokemon: Pokemon): Promise<Pokemon> {
    const pokemonIndex = this.pokemons.findIndex(
      iterablePokemon => iterablePokemon.id === pokemon.id,
    );

    this.pokemons[pokemonIndex] = pokemon;

    return this.pokemons[pokemonIndex];
  }

  public async delete(id: string): Promise<void> {
    const pokemonIndex = this.pokemons.findIndex(pokemon => pokemon.id === id);

    this.pokemons.splice(pokemonIndex, 1);
  }
}

export default FakePokemonsRepository;
