import 'dotenv/config';

export const APP_PORT = process.env.PORT;

export const DB_CONFIG = {
  NAME: process.env.PG_DATABASE,
  PORT: +process.env.PG_PORT,
  USER: process.env.PG_USER,
  PASSWORD: process.env.PG_PASS,
  HOST: process.env.PG_HOST,
};

export const REDIS_CONFIG = {
  HOST: process.env.REDIS_HOST,
  PORT: +process.env.REDIS_PORT,
};

export const CACHE_TTL = +process.env.CACHE_TTL || 300;
