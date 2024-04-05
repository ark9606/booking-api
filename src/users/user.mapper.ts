// import { ReservationMapper } from 'src/reservations/infrastructure/persistence/reservation.mapper';
import { UserDTO } from './user.dto';
import { UserEntity } from './user.entity';
// import { Collection } from '@mikro-orm/core';
// import { ReservationEntity } from 'src/reservations/infrastructure/persistence/reservation.entity';

export class UserMapper {
  static toDTO(entity: UserEntity): UserDTO {
    return {
      userId: entity.userId,
      firstName: entity.firstName,
      lastName: entity.lastName,
      email: entity.email,
      // reservations:
      //   entity.reservations && entity.reservations.isInitialized
      //     ? entity.reservations.map(ReservationMapper.toDTO)
      //     : undefined,
    };
  }

  static toEntity(dto: UserDTO): UserEntity {
    const entity = new UserEntity();
    entity.userId = dto.userId;
    entity.firstName = dto.firstName;
    entity.lastName = dto.lastName;
    entity.email = dto.email;
    // if (dto.reservations) {
    //   entity.reservations = new Collection<ReservationEntity>(entity);
    //   dto.reservations.forEach((reservation) => {
    //     entity.reservations.add(ReservationMapper.toEntity(reservation));
    //   });
    // }
    return entity;
  }
}
