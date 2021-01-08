import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export default class AddGenerationNumberToGames1610113298922
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      'games',
      new TableColumn({
        name: 'generation_number',
        type: 'integer',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('games', 'generation_number');
  }
}
