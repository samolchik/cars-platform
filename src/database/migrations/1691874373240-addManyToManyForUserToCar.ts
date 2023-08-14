import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddManyToManyForUserToCar1691874373240
  implements MigrationInterface
{
  name = 'AddManyToManyForUserToCar1691874373240';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "car" ADD "sold" boolean NOT NULL DEFAULT false`,
    );
    await queryRunner.query(
      `ALTER TABLE "car" ALTER COLUMN "bodyType" SET DEFAULT 'sedan'`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "car" ALTER COLUMN "bodyType" DROP DEFAULT`,
    );
    await queryRunner.query(`ALTER TABLE "car" DROP COLUMN "sold"`);
  }
}
