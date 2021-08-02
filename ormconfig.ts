import { ConnectionOptions } from 'typeorm'

const url = process.env.TYPEORM_URL

const config:ConnectionOptions =  {
    type: 'postgres',
    url: url ? url : undefined,
    host: !url ? process.env.TYPEORM_HOST : undefined,
    port: !url ? Number(process.env.TYPEORM_PORT) : undefined,
    username: !url ? process.env.TYPEORM_USERNAME : undefined,
    password: !url ? process.env.TYPEORM_PASSWORD : undefined,
    database: !url ? process.env.TYPEORM_DATABASE : undefined,
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