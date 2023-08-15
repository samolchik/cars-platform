import { MigrationInterface, QueryRunner } from "typeorm";

export class AddBaseEntities1692105948290 implements MigrationInterface {
    name = 'AddBaseEntities1692105948290'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "role" RENAME COLUMN "value" TO "role"`);
        await queryRunner.query(`ALTER TABLE "role" RENAME CONSTRAINT "UQ_98082dbb08817c9801e32dd0155" TO "UQ_367aad98203bd8afaed0d704093"`);
        await queryRunner.query(`CREATE TABLE "posts" ("id" SERIAL NOT NULL, "title" character varying NOT NULL, "content" character varying NOT NULL, "image" character varying NOT NULL, "authorId" integer, CONSTRAINT "PK_2829ac61eff60fcec60d7274b9e" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "car" ADD "mileage" integer DEFAULT '0'`);
        await queryRunner.query(`ALTER TABLE "car" ADD "detailedDescription" character varying`);
        await queryRunner.query(`ALTER TABLE "car" ADD "createdAt" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "car" ADD "updatedAt" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "posts" ADD CONSTRAINT "FK_c5a322ad12a7bf95460c958e80e" FOREIGN KEY ("authorId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "posts" DROP CONSTRAINT "FK_c5a322ad12a7bf95460c958e80e"`);
        await queryRunner.query(`ALTER TABLE "car" DROP COLUMN "updatedAt"`);
        await queryRunner.query(`ALTER TABLE "car" DROP COLUMN "createdAt"`);
        await queryRunner.query(`ALTER TABLE "car" DROP COLUMN "detailedDescription"`);
        await queryRunner.query(`ALTER TABLE "car" DROP COLUMN "mileage"`);
        await queryRunner.query(`DROP TABLE "posts"`);
        await queryRunner.query(`ALTER TABLE "role" RENAME CONSTRAINT "UQ_367aad98203bd8afaed0d704093" TO "UQ_98082dbb08817c9801e32dd0155"`);
        await queryRunner.query(`ALTER TABLE "role" RENAME COLUMN "role" TO "value"`);
    }

}
