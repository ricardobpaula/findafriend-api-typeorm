import {MigrationInterface, QueryRunner} from "typeorm";

export class PetAndPhotoCreate1619294016509 implements MigrationInterface {
    name = 'PetAndPhotoCreate1619294016509'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "photos" ("id" SERIAL NOT NULL, "file_name" character varying NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "pet_id" integer, CONSTRAINT "PK_5220c45b8e32d49d767b9b3d725" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TYPE "pets_specie_enum" AS ENUM('dog', 'bird', 'cat')`);
        await queryRunner.query(`CREATE TYPE "pets_size_enum" AS ENUM('small', 'medium', 'big')`);
        await queryRunner.query(`CREATE TABLE "pets" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "description" text NOT NULL, "specie" "pets_specie_enum" NOT NULL, "size" "pets_size_enum" NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "owner_id" integer, CONSTRAINT "PK_d01e9e7b4ada753c826720bee8b" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "photos" ADD CONSTRAINT "FK_211e21cb87084397a90321ca01e" FOREIGN KEY ("pet_id") REFERENCES "pets"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "pets" ADD CONSTRAINT "FK_d6c565fded8031d4cdd54fe1043" FOREIGN KEY ("owner_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "pets" DROP CONSTRAINT "FK_d6c565fded8031d4cdd54fe1043"`);
        await queryRunner.query(`ALTER TABLE "photos" DROP CONSTRAINT "FK_211e21cb87084397a90321ca01e"`);
        await queryRunner.query(`DROP TABLE "pets"`);
        await queryRunner.query(`DROP TYPE "pets_size_enum"`);
        await queryRunner.query(`DROP TYPE "pets_specie_enum"`);
        await queryRunner.query(`DROP TABLE "photos"`);
    }

}
