import { MigrationInterface, QueryRunner } from "typeorm";

export class InitialMigration1691617271311 implements MigrationInterface {
    name = 'InitialMigration1691617271311'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "public"."car_bodytype_enum" AS ENUM('crossover', 'wagon', 'sedan', 'coupe', 'hatchback', 'convertible', 'pickup', 'minivan')`);
        await queryRunner.query(`CREATE TYPE "public"."car_status_enum" AS ENUM('new', 'used')`);
        await queryRunner.query(`CREATE TYPE "public"."car_currency_enum" AS ENUM('USD', 'EUR', 'UAH')`);
        await queryRunner.query(`CREATE TABLE "car" ("id" SERIAL NOT NULL, "brand" character varying, "model" character varying, "age" integer, "bodyType" "public"."car_bodytype_enum" NOT NULL, "status" "public"."car_status_enum" NOT NULL DEFAULT 'new', "price" integer, "region" character varying, "currency" "public"."car_currency_enum" NOT NULL DEFAULT 'UAH', "userId" integer, CONSTRAINT "PK_55bbdeb14e0b1d7ab417d11ee6d" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TYPE "public"."user_role_enum" AS ENUM('Buyer', 'Seller', 'Manager', 'Administrator')`);
        await queryRunner.query(`CREATE TYPE "public"."user_accounttype_enum" AS ENUM('Basic', 'Premium')`);
        await queryRunner.query(`CREATE TABLE "user" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "email" character varying NOT NULL, "password" character varying NOT NULL, "banned" boolean NOT NULL DEFAULT false, "banReason" character varying NOT NULL, "role" "public"."user_role_enum" NOT NULL DEFAULT 'Buyer', "accountType" "public"."user_accounttype_enum" NOT NULL DEFAULT 'Basic', CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22" UNIQUE ("email"), CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "car" ADD CONSTRAINT "FK_a4f3cb1b950608959ba75e8df36" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "car" DROP CONSTRAINT "FK_a4f3cb1b950608959ba75e8df36"`);
        await queryRunner.query(`DROP TABLE "user"`);
        await queryRunner.query(`DROP TYPE "public"."user_accounttype_enum"`);
        await queryRunner.query(`DROP TYPE "public"."user_role_enum"`);
        await queryRunner.query(`DROP TABLE "car"`);
        await queryRunner.query(`DROP TYPE "public"."car_currency_enum"`);
        await queryRunner.query(`DROP TYPE "public"."car_status_enum"`);
        await queryRunner.query(`DROP TYPE "public"."car_bodytype_enum"`);
    }

}
