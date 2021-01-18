import Game from '../infra/typeorm/entities/Game';

import IFindAllGamesDTO from '../dtos/IFindAllGamesDTO';
import ICreateGameDTO from '../dtos/ICreateGameDTO';

export default interface IGamesRepository {
  all(data: IFindAllGamesDTO): Promise<Game[]>;
  findById(id: string): Promise<Game | undefined>;
  findByName(name: string): Promise<Game | undefined>;
  create(data: ICreateGameDTO): Promise<Game>;
  update(game: Game): Promise<Game>;
  delete(id: string): Promise<void>;
}
