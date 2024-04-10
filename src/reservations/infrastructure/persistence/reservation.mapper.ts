import { ReservationDTO } from 'src/reservations/application/reservation.dto';
import { ReservationEntity } from './reservation.entity';
import { UserMapper } from 'src/users/infrastructure/persistence/user.mapper';
import { RoomMapper } from 'src/rooms/infrastructure/persistence/room.mapper';

export class ReservationMapper {
  static toDTO(entity: ReservationEntity): ReservationDTO {
    return {
      reservationId: entity.reservationId,
      dateStart: entity.dateStart,
      dateEnd: entity.dateEnd,
      statusCode: entity.statusCode,
      userId: entity.userId,
      roomId: entity.roomId,
      room: RoomMapper.toDTO(entity.room),
      user: UserMapper.toDTO(entity.user),
    };
  }

  static toEntity(dto: ReservationDTO): ReservationEntity {
    const entity = new ReservationEntity();
    entity.reservationId = dto.reservationId;
    entity.dateStart = dto.dateStart;
    entity.dateEnd = dto.dateEnd;
    entity.statusCode = dto.statusCode;
    entity.userId = dto.userId;
    entity.roomId = dto.roomId;
    if (dto.room) entity.room = RoomMapper.toEntity(dto.room);
    if (dto.user) entity.user = UserMapper.toEntity(dto.user);
    return entity;
  }
}
