import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export default class DropDescriptionColumnAtMethods1609950713212
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('methods', 'description');
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      'methods',
      new TableColumn({
        name: 'description',
        type: 'varchar',
        isNullable: true,
      }),
    );
  }
}
