import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm';

import GamesMethods from '@modules/games/infra/typeorm/entities/GamesMethods';

@Entity('methods')
class Method {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @OneToMany(() => GamesMethods, gamesMethods => gamesMethods.method, {
    eager: true,
  })
  game_methods: GamesMethods[];

  @Column()
  name: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default Method;
