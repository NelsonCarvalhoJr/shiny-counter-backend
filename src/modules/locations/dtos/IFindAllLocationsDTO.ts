export default interface IFindAllLocationsDTO {
  name?: string;
  order?: {
    [field_name: string]: 'ASC' | 'DESC';
  };
}
