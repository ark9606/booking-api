import 'dotenv/config';

export const APP_PORT = process.env.PORT;

export const DB_CONFIG = {
  NAME: process.env.PG_DATABASE,
  PORT: +process.env.PG_PORT,
  USER: process.env.PG_USER,
  PASSWORD: process.env.PG_PASS,
  HOST: process.env.PG_HOST,
};