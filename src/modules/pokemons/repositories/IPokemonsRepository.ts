import Pokemon from '../infra/typeorm/entities/Pokemon';

import IFindAllPokemonsDTO from '../dtos/IFindAllPokemonsDTO';
import ICreatePokemonDTO from '../dtos/ICreatePokemonDTO';

export default interface IPokemonsRepository {
  all(data: IFindAllPokemonsDTO): Promise<Pokemon[]>;
  findById(id: string): Promise<Pokemon | undefined>;
  findByName(name: string): Promise<Pokemon | undefined>;
  findByPokedexNumber(pokedex_number: number): Promise<Pokemon | undefined>;
  create(data: ICreatePokemonDTO): Promise<Pokemon>;
  update(pokemon: Pokemon): Promise<Pokemon>;
  delete(id: string): Promise<void>;
}
