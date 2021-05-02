import { ConnectionOptions } from 'typeorm'

const config:ConnectionOptions =  {
    type: 'postgres',
    host: process.env.TYPEORM_HOST,
    port: Number(process.env.TYPEORM_PORT),
    username: process.env.TYPEORM_USERNAME,
    password: process.env.TYPEORM_PASSWORD,
    database: process.env.TYPEORM_DATABASE,
    synchronize: process.env.TYPEORM_SYNCHRONIZE == 'true',
    logging: process.env.TYPEORM_LOGGING  == 'true',
    entities: [String(process.env.TYPEORM_ENTITIES)],
    migrations: ["src/database/migrations/**/*.ts"],
    cli: {
        entitiesDir: 'src/models',
        migrationsDir: 'src/database/migrations',
    }
}

export = config