## Description
The project is a simple booking API for hotels. Available features:
- View the list of rooms with pagination and sorting
- View the room details by id
- View the room availability by id for a specific date range
- Create a reservation for a room for a specific date range
- Cancel a reservation by id

## Architecture
The architecture of the project uses Clean architecture principles, with the following layers:
- application: contains the business logic of the application, without any dependencies on the infrastructure
- infrastructure: contains the implementation of the repositories, and other infrastructure-related code

### Stack
- NestJS framework
- MikroORM
- Docker
- PostgreSQL
- Redis
- Jest
- Swagger
- Pino logger

### Assumptions
 - As the project is a simple booking API for hotels, and authentication and authorization are other responsibilities, these functionalities are not properly implemented in the project.
 - Besides, the endpoints for creating and canceling reservations requires sending a user id, in order to mimic authentication. This is not a good practice, in a real-world scenario, JWT tokens should be used for authentication.
 - Currently, async messages are sent via Node.js EventEmitter, in a real-world scenario, a message broker like RabbitMQ or Kafka should be used. The message has corresponding listeners, which simply prints received messages to the console and prints all received messages every 30 seconds.
 - Security of the API is implemented with API key (`API_KEY` env variable), for the sake of simplicity.

## Prerequisites
1. Install Node.js LTS from https://nodejs.org/en

2. Install docker from https://docs.docker.com/get-docker
  
3. Install yarn
```bash
$ npm install --global yarn
```

## Setting up
##### Prepare the infrastructure
```bash
$ docker-compose up -d
```
##### Install dependencies
```bash
$ yarn install
```
##### Run migrations
```bash
$ yarn migration:run
```
##### Configure the environment variables
```bash
$ cp .env.sample .env
```
##### Seed database
This command will create 2000000 rooms, 1000 users and around 5000 reservations. This may take a while (5-7min), depending on your machine performance.
If you want to seed a smaller amount of data, you can change the values in the /src/scripts/seed-db.ts file.
Execute the following command to seed the database:
```bash
$ yarn run seed
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

## API Documentation
- OpenAPI is available at http://localhost:3000/docs
- Postman collection is available at directory /docs/postman

## Instractions to use the API
- Import Postman collection and environments from /docs/postman
- Set apiKey variable, if it was changed in .env file
- Call GET {{base_url}}/users - this will set userIds for the next requests
- Call GET {{base_url}}/rooms - this will set roomId for the next requests
- Call GET {{base_url}}/rooms/{{roomId}}
- Call GET {{base_url}}/rooms/{{roomId}}/availability?from=2024-04-05&to=2024-10-01
- Call POST {{base_url}}/reservations - this will set reservationId for the next requests
- Call DELETE {{base_url}}/reservations/{{reservationId}}

## Tests

```bash
# unit tests
$ yarn run test
```

## Caching
Cache Aside strategy is implemented with Redis for next endpoints:
- GET /rooms
- GET /rooms/:roomId
- GET /rooms/:roomId/availability
Cache TTL is configured by env variable `CACHE_TTL`.

## How to work with migrations
```bash
# create migration
$ yarn migration:generate MigrationName

# run migrations
$ yarn migration:run
```

## License

Nest is [MIT licensed](LICENSE).
