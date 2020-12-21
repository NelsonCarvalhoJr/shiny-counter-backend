import Pokemon from '../models/Pokemon';

interface ICreatePokemonDTO {
  name: string;
}

interface IUpdatePokemonDTO {
  id: string;
  name: string;
}

class PokemonsRepository {
  private pokemons: Pokemon[];

  constructor() {
    this.pokemons = [];
  }

  public all(): Pokemon[] {
    return this.pokemons;
  }

  public create({ name }: ICreatePokemonDTO): Pokemon {
    const pokemon = new Pokemon({ name });

    this.pokemons.push(pokemon);

    return pokemon;
  }

  public delete(id: string): void {
    const pokemonIndex = this.pokemons.findIndex(pokemon => pokemon.id === id);

    this.pokemons.splice(pokemonIndex, 1);
  }

  public findAllByName(name: string): Pokemon[] {
    const filteredPokemons = this.pokemons.filter(pokemon =>
      pokemon.name.toLowerCase().includes(name.toLowerCase()),
    );

    return filteredPokemons;
  }

  public findById(id: string): Pokemon | null {
    const pokemonIndex = this.pokemons.findIndex(pokemon => pokemon.id === id);

    return this.pokemons[pokemonIndex] || null;
  }

  public findOneByName(name: string): Pokemon | null {
    const pokemonIndex = this.pokemons.findIndex(
      pokemon => pokemon.name.toLocaleLowerCase() === name.toLowerCase(),
    );

    return this.pokemons[pokemonIndex] || null;
  }

  public update({ id, name }: IUpdatePokemonDTO): Pokemon {
    const pokemonIndex = this.pokemons.findIndex(pokemon => pokemon.id === id);

    const pokemon = {
      id,
      name,
    };

    this.pokemons[pokemonIndex] = pokemon;

    return pokemon;
  }
}

export default PokemonsRepository;
