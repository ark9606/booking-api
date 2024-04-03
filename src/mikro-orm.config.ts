import { Migrator } from '@mikro-orm/migrations';
import { Options, PostgreSqlDriver } from '@mikro-orm/postgresql';
import { DB_CONFIG } from './config';

const dbConfig: Options = {
  driver: PostgreSqlDriver,
  entities: ['./dist/**/*.entity.js'],
  entitiesTs: ['./src/**/*.entity.ts'],
  dbName: DB_CONFIG.NAME,
  port: DB_CONFIG.PORT,
  user: DB_CONFIG.USER,
  password: DB_CONFIG.PASSWORD,
  host: DB_CONFIG.HOST,
  extensions: [Migrator],
  migrations: {
    path: './dist/migrations',
    pathTs: './src/migrations',
    glob: '!(*.d).{js,ts}',
    transactional: true,
  },
};

export default dbConfig;
