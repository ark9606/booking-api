import { faker } from '@faker-js/faker';
import { RoomDTO } from '../../src/rooms/application/room.dto';
import { RoomEntity } from '../../src/rooms/infrastructure/persistence/room.entity';
import { generateUUID } from '../../src/common/utils';

export class RoomFixture {
  public static createDTO(): RoomDTO {
    return {
      roomId: generateUUID(),
      title: faker.company.name(),
      location: faker.location.streetAddress(),
      description: faker.lorem.paragraph(),
      area: faker.number.int({ min: 15, max: 100 }),
      price: faker.number.float({
        min: 20,
        max: 10000,
        multipleOf: 0.01,
      }),
    };
  }

  public static createEntity(): RoomEntity {
    const room = new RoomEntity();
    room.roomId = generateUUID();
    room.title = faker.company.name();
    room.location = faker.location.streetAddress();
    room.description = faker.lorem.paragraph();
    room.area = faker.number.int({ min: 15, max: 100 });
    room.price = faker.number.float({
      min: 20,
      max: 10000,
      multipleOf: 0.01,
    });

    return room;
  }
}
