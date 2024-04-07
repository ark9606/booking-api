import { faker } from '@faker-js/faker';
import { generateUUID } from '../../src/common/utils';
import { ReservationDTO } from '../../src/reservations/application/reservation.dto';
import { RESERVATION_STATUS } from '../../src/reservations/constants';
import { RoomFixture } from '../rooms/room.fixture';
import { UserFixture } from '../users/user.fixture';

export class ReservationFixture {
  public static createDTO(dto?: Partial<ReservationDTO>): ReservationDTO {
    return {
      reservationId: generateUUID(),
      dateStart: dto?.dateStart || faker.date.soon({ days: 1 }),
      dateEnd: dto?.dateEnd || faker.date.soon({ days: 5 }),
      statusCode: dto?.statusCode || RESERVATION_STATUS.CREATED,
      userId: dto?.userId || generateUUID(),
      roomId: dto?.roomId || generateUUID(),
      room: dto?.room || RoomFixture.createDTO(),
      user: dto?.user || UserFixture.createDTO(),
    };
  }

}