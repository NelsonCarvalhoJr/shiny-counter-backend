export default interface ICreateGameDTO {
  name: string;
  generation_number: number;
  game_methods: Array<{
    method_id: string;
  }>;
}
