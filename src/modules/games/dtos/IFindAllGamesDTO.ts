export default interface IFindAllGamesDTO {
  name?: string;
  generation_number?: number;
  order?: {
    [field_name: string]: 'ASC' | 'DESC';
  };
}
