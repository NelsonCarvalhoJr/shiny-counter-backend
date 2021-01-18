export default interface IFindAllUsersDTO {
  name?: string;
  email?: string;
  order?: {
    [field_name: string]: 'ASC' | 'DESC';
  };
}
