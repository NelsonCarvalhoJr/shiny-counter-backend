import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';

import Method from '@modules/methods/infra/typeorm/entities/Method';
import Game from './Game';

@Entity('games_methods')
class GamesMethods {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Game)
  @JoinColumn({ name: 'game_id' })
  game: Game;

  @ManyToOne(() => Method)
  @JoinColumn({ name: 'method_id' })
  method: Method;

  @Column()
  game_id: string;

  @Column()
  method_id: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default GamesMethods;
