## Description

TODO

## Prerequisits
Install Node.js LTS from https://nodejs.org/en

Install yarn
```bash
$ npm install --global yarn
```

## Installation

```bash
$ yarn install
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
