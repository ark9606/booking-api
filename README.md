## Description

TODO

Skipped or simplified aspects:
- logging, ideally separate logger should be used
- validation, ideally should be performed

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
Seed database, this will create 10000 rooms, 100 users and around 1000 reservations:
```bash
$ node .\dist\scripts\seed-db.js
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

# e2e tests
$ yarn run test:e2e

# test coverage
$ yarn run test:cov
```

## Migrations
```bash
# create migration
$ npx mikro-orm migration:create --name MigrationName

# compile new migration
$ yarn build

# run migrations
$ npx mikro-orm migration:up
```

## License

Nest is [MIT licensed](LICENSE).
