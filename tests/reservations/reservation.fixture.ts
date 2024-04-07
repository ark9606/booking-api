import { faker } from '@faker-js/faker';
import { generateUUID } from '../../src/common/utils';
import { ReservationDTO } from '../../src/reservations/application/reservation.dto';
import { RESERVATION_STATUS } from '../../src/reservations/constants';
import { RoomFixture } from '../rooms/room.fixture';
import { UserFixture } from '../users/user.fixture';

export class ReservationFixture {
  public static createDTO(dto?: Partial<ReservationDTO>): ReservationDTO {
    const room = dto?.room || RoomFixture.createDTO();
    const user = dto?.user || UserFixture.createDTO();
    return {
      reservationId: generateUUID(),
      dateStart: dto?.dateStart
        ? new Date(dto.dateStart.getTime())
        : faker.date.soon({ days: 1 }),
      dateEnd: dto?.dateEnd
        ? new Date(dto.dateEnd.getTime())
        : faker.date.soon({ days: 5 }),
      statusCode: dto?.statusCode || RESERVATION_STATUS.CREATED,
      userId: user?.userId || generateUUID(),
      roomId: room?.roomId || generateUUID(),
      room,
      user,
    };
  }
}
