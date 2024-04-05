import {
  BadRequestException,
  ForbiddenException,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
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
      throw new NotFoundException('Room not found');
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

  public async cancel(user: UserDTO, reservationId: string): Promise<void> {
    const reservation = await this.reservationRepo.findById(reservationId);
    if (!reservation) {
      throw new NotFoundException('Reservation not found');
    }
    // only user who created reservation able to cancel it
    if (reservation.user.userId !== user.userId) {
      throw new ForbiddenException(
        'User is not allowed to cancel this reservation',
      );
    }

    const cancelled =
      await this.reservationRepo.cancelReservation(reservationId);

    if (!cancelled) {
      throw new BadRequestException('Reservation was not cancelled');
    }
  }
}
