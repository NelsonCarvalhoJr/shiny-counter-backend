import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export default class CreateGamesMethods1609946714264
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'games_methods',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            generationStrategy: 'uuid',
            default: 'uuid_generate_v4()',
          },
          {
            name: 'game_id',
            type: 'uuid',
          },
          {
            name: 'method_id',
            type: 'uuid',
          },
          {
            name: 'created_at',
            type: 'timestamp',
            default: 'now()',
          },
          {
            name: 'updated_at',
            type: 'timestamp',
            default: 'now()',
          },
        ],
        foreignKeys: [
          {
            name: 'GameMethodGame',
            referencedTableName: 'games',
            referencedColumnNames: ['id'],
            columnNames: ['game_id'],
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE',
          },
          {
            name: 'GameMethodMethod',
            referencedTableName: 'methods',
            referencedColumnNames: ['id'],
            columnNames: ['method_id'],
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE',
          },
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('games_methods');
  }
}
