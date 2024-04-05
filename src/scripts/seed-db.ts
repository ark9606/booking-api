import { MikroORM } from '@mikro-orm/postgresql';
import dbConfig from '../mikro-orm.config';
import { RoomEntity } from '../rooms/infrastructure/persistence/room.entity';
import { faker } from '@faker-js/faker';
import { UserEntity } from '../users/user.entity';
import { ReservationEntity } from '../reservations/infrastructure/persistence/reservation.entity';
import { RESERVATION_STATUS } from '../reservations/constants';

const ROOMS_COUNT = 10000;
const USERS_COUNT = 100;
(async () => {
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
  let rooms = new Array(ROOMS_COUNT).fill(null).map(() =>
    roomRepository.create({
      title: faker.company.name(),
      location: faker.location.streetAddress(),
      description: faker.lorem.paragraph(),
      area: faker.number.int({ min: 15, max: 50 }),
      price: faker.number.int({ min: 100, max: 1000 }),
    }),
  );
  await roomRepository.insertMany(rooms);
  rooms = await roomRepository.findAll();
  console.log(`Created ${ROOMS_COUNT} rooms successfully!`);

  let users = new Array(USERS_COUNT).fill(null).map(() =>
    userRepository.create({
      firstName: faker.person.firstName(),
      lastName: faker.person.lastName(),
      email: faker.internet.email(),
    }),
  );
  await userRepository.insertMany(users);
  users = await userRepository.findAll();
  console.log(`Created ${USERS_COUNT} users successfully!`);

  const reservations: ReservationEntity[] = [];
  const usedRooms = new Set<string>();
  for (const user of users) {
    for (let i = 0; i < faker.number.int({ min: 10, max: 15 }); i++) {
      let room = faker.helpers.arrayElement(rooms);
      while (usedRooms.has(room.roomId)) {
        room = faker.helpers.arrayElement(rooms);
      }
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
      usedRooms.add(room.roomId);
    }
  }
  await reservationRepository.insertMany(reservations);
  console.log(`Created ${reservations.length} reservations successfully!`);

  await orm.close();
})();
