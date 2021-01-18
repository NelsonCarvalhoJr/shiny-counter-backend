import GamesMethods from '../infra/typeorm/entities/GamesMethods';

import IFindAllGamesMethodsDTO from '../dtos/IFindAllGamesMethodsDTO';
import ICreateGamesMethodsDTO from '../dtos/ICreateGamesMethodsDTO';

export default interface IGamesRepository {
  all(data: IFindAllGamesMethodsDTO): Promise<GamesMethods[]>;
  create(data: ICreateGamesMethodsDTO): Promise<GamesMethods>;
  delete(game_method_id: string): Promise<void>;
}
