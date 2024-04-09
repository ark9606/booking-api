## Description

TODO:
- validatiom with joi

Skipped or simplified aspects:
By assumption the auth is managed outside the booking API.

## Prerequisits
Install Node.js LTS from https://nodejs.org/en

Install yarn
```bash
$ npm install --global yarn
```
Install docker from https://docs.docker.com/get-docker

## Setting up
Install dependencies:
```bash
$ yarn install
$ yarn build
```
Setup DB schema:
```bash
# run migrations
$ npx mikro-orm migration:up --config ./dist/src/mikro-orm.config.js
```
Seed database, this will create 10000 rooms, 100 users and around 1000 reservations:
```bash
$ node .\dist\src\scripts\seed-db.js
```

## Running the app

```bash
# development
$ yarn run start

# watch mode
$ yarn run start:dev

# production mode
$ yarn run start:prod
```

## Test

```bash
# unit tests
$ yarn run test
```

## Caching
Cache Aside strategy is implemented for next endpoints:
- GET /rooms/:roomId
- GET /rooms/:roomId/availability
Cache TTL is configured by env variable CACHE_TTL

## Migrations
```bash
# create migration
$ npx mikro-orm migration:create --config ./dist/src/mikro-orm.config.js --name MigrationName

# compile new migration
$ yarn build

# run migrations
$ npx mikro-orm migration:up --config ./dist/src/mikro-orm.config.js
```

## License

Nest is [MIT licensed](LICENSE).
