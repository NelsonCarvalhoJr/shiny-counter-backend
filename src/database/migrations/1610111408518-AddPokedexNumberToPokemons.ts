import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export default class AddPokedexNumberToPokemons1610111408518
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      'pokemons',
      new TableColumn({
        name: 'pokedex_number',
        type: 'integer',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('pokemons', 'pokedex_number');
  }
}
