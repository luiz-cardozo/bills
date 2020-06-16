import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export default class AddTypeColumntToTransaction1591819888513
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      'transactions',
      new TableColumn({
        name: 'type',
        type: 'varchar',
        default: 'outcome',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('transactions', 'type');
  }
}
