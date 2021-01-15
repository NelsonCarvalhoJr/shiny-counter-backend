import { MigrationInterface, QueryRunner, TableUnique } from 'typeorm';

export default class AddUniqueToPokedexNumberInPokemons1610113577997
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createUniqueConstraint(
      'pokemons',
      new TableUnique({
        name: 'UQ_PokedexNumber',
        columnNames: ['pokedex_number'],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropUniqueConstraint('pokemons', 'UQ_PokedexNumber');
  }
}
