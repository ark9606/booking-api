import { MikroORM } from '@mikro-orm/postgresql';
import dbConfig from '../mikro-orm.config';
import { RoomEntity } from '../rooms/infrastructure/persistence/room.entity';
import { faker } from '@faker-js/faker';
import { UserEntity } from '../users/infrastructure/persistence/user.entity';
import { ReservationEntity } from '../reservations/infrastructure/persistence/reservation.entity';
import { RESERVATION_STATUS } from '../reservations/constants';
import { RoomFixture } from '../../tests/rooms/room.fixture';
import { UserFixture } from '../../tests/users/user.fixture';

const ROOMS_COUNT = 2_000_000;
const USERS_COUNT = 1_000;
const MAX_USER_RESERVATIONS = 10;
(async () => {
  const startedAt = Date.now();
  const orm = await MikroORM.init(dbConfig);
  const em = orm.em.fork(); // create a new EntityManager instance for context-specific operations

  const roomRepository = em.getRepository(RoomEntity);
  const userRepository = em.getRepository(UserEntity);
  const reservationRepository = em.getRepository(ReservationEntity);

  console.log('Clearing the database...');
  await reservationRepository.nativeDelete({});
  await roomRepository.nativeDelete({});
  await userRepository.nativeDelete({});

  console.log('Seeding the database...');
  const chunk = 10000;
  for (let i = 0; i < ROOMS_COUNT / chunk; i++) {
    const rooms = new Array(chunk)
      .fill(null)
      .map(() => roomRepository.create(RoomFixture.createEntity()));
    await roomRepository.insertMany(rooms);
  }
  const rooms = await roomRepository.find(
    {},
    { limit: MAX_USER_RESERVATIONS * USERS_COUNT },
  );
  console.log(`Created ${ROOMS_COUNT} rooms successfully!`);

  let users = new Array(USERS_COUNT)
    .fill(null)
    .map(() => userRepository.create(UserFixture.createEntity()));

  await userRepository.insertMany(users);
  users = await userRepository.findAll();
  console.log(`Created ${USERS_COUNT} users successfully!`);

  const reservations: ReservationEntity[] = [];
  let roomIndex = 0;
  for (const user of users) {
    const reservationsCount = faker.number.int({
      min: 1,
      max: MAX_USER_RESERVATIONS,
    });
    for (let i = 0; i < reservationsCount; i++) {
      const room = rooms[roomIndex++];
      const dateStart = faker.date.soon({ days: 5 });
      reservations.push(
        reservationRepository.create({
          dateStart: dateStart.toISOString(),
          dateEnd: faker.date
            .soon({ refDate: dateStart, days: 20 })
            .toISOString(),
          statusCode: RESERVATION_STATUS.CREATED,
          user,
          room,
        }),
      );
    }
  }

  await reservationRepository.insertMany(reservations);
  console.log(`Created ${reservations.length} reservations successfully!`);
  console.log(`Seeding finished in ${(Date.now() - startedAt) / 1000} seconds`);

  await orm.close();
})();
