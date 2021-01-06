import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm';

import GamesMethods from './GamesMethods';

@Entity('games')
class Game {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @OneToMany(() => GamesMethods, gamesMethods => gamesMethods.game, {
    eager: true,
    cascade: ['insert'],
  })
  game_methods: GamesMethods[];

  @Column()
  name: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default Game;
