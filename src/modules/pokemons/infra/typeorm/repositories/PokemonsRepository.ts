import { getRepository, Repository, Raw } from 'typeorm';

import IPokemonsRepository from '@modules/pokemons/repositories/IPokemonsRepository';
import IFindAllPokemonsDTO from '@modules/pokemons/dtos/IFindAllPokemonsDTO';
import ICreatePokemonDTO from '@modules/pokemons/dtos/ICreatePokemonDTO';

import Pokemon from '../entities/Pokemon';

class PokemonsRepository implements IPokemonsRepository {
  private ormRepository: Repository<Pokemon>;

  constructor() {
    this.ormRepository = getRepository(Pokemon);
  }

  public async all({
    name = '',
    pokedex_number,
    order,
  }: IFindAllPokemonsDTO): Promise<Pokemon[]> {
    const where = {
      name: Raw(alias => `LOWER(${alias}) Like '%${name.toLowerCase()}%'`),
      pokedex_number,
    };

    if (!pokedex_number) {
      delete where.pokedex_number;
    }

    const whereAndOrder = {
      where,
      order,
    };

    const pokemons = await this.ormRepository.find(whereAndOrder);

    return pokemons;
  }

  public async findById(id: string): Promise<Pokemon | undefined> {
    const pokemon = await this.ormRepository.findOne(id);

    return pokemon;
  }

  public async findByName(name: string): Promise<Pokemon | undefined> {
    const pokemon = await this.ormRepository.findOne({
      where: {
        name: Raw(alias => `LOWER(${alias}) Like '%${name.toLowerCase()}%'`),
      },
    });

    return pokemon;
  }

  public async findByPokedexNumber(
    pokedex_number: number,
  ): Promise<Pokemon | undefined> {
    const pokemon = await this.ormRepository.findOne({
      where: {
        pokedex_number,
      },
    });

    return pokemon;
  }

  public async create({
    name,
    pokedex_number,
  }: ICreatePokemonDTO): Promise<Pokemon> {
    const pokemon = this.ormRepository.create({
      name,
      pokedex_number,
    });

    await this.ormRepository.save(pokemon);

    return pokemon;
  }

  public async update(pokemon: Pokemon): Promise<Pokemon> {
    return this.ormRepository.save(pokemon);
  }

  public async delete(id: string): Promise<void> {
    await this.ormRepository.delete(id);
  }
}

export default PokemonsRepository;
