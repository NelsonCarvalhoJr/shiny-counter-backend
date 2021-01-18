export default interface IFindAllMethodsDTO {
  name?: string;
  order?: {
    [field_name: string]: 'ASC' | 'DESC';
  };
}
