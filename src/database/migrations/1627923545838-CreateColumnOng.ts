import {MigrationInterface, QueryRunner} from "typeorm";

export class CreateColumnOng1627923545838 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE users ADD is_ong boolean DEFAULT false`)
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE users DROP is_ong`)
    }

}
