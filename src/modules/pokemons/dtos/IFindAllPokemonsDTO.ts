export default interface IFindAllPokemonsDTO {
  name?: string;
  pokedex_number?: number;
  order?: {
    [field_name: string]: 'ASC' | 'DESC';
  };
}
