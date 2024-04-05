import { Inject, Injectable } from '@nestjs/common';
import { IReservationRepository } from './reservation.repository.interface';
import { DI_TOKENS } from '../../common/di-tokens';
import { IRoomRepository } from 'src/rooms/application/room.repository.interface';
import { UserDTO } from 'src/users/user.dto';
import { CreateReservationResponse } from '../infrastructure/api/createReservation/CreateReservationResponse';

@Injectable()
export class ReservationsService {
  constructor(
    @Inject(DI_TOKENS.RESERVATION_REPOSITORY)
    private readonly reservationRepo: IReservationRepository,
    @Inject(DI_TOKENS.ROOM_REPOSITORY)
    private readonly roomRepo: IRoomRepository,
  ) {}

  public async create(inputData: {
    user: UserDTO;
    roomId: string;
    dateStart: Date;
    dateEnd: Date;
  }): Promise<CreateReservationResponse> {
    const room = await this.roomRepo.findById(inputData.roomId);
    if (!room) {
      throw new Error('Room not found');
    }
    const createdReservationId = await this.reservationRepo.createReservation({
      user: inputData.user,
      room,
      dateStart: inputData.dateStart,
      dateEnd: inputData.dateEnd,
    });

    const reservation =
      await this.reservationRepo.findById(createdReservationId);

    return {
      reservationId: reservation.reservationId,
      dateStart: reservation.dateStart,
      dateEnd: reservation.dateEnd,
      room: reservation.room,
    };
  }
}
