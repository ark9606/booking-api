/* eslint-disable @typescript-eslint/no-unused-vars */
import { RoomDTO } from 'src/rooms/application/room.dto';
import { UserDTO } from 'src/users/application/user.dto';
import { ReservationDTO } from 'src/reservations/application/reservation.dto';
import { IReservationRepository } from 'src/reservations/application/reservation.repository.interface';
import { Injectable } from '@nestjs/common';

@Injectable()
export class ReservationRepositoryMock implements IReservationRepository {
  public async findById(id: string): Promise<ReservationDTO | null> {
    return null;
  }

  public async listReservations(params: {
    room: RoomDTO;
    dateStart: Date;
    dateEnd: Date;
  }): Promise<ReservationDTO[]> {
    return [];
  }

  public async createReservation(input: {
    user: UserDTO;
    room: RoomDTO;
    dateStart: Date;
    dateEnd: Date;
  }): Promise<string> {
    return '';
  }

  public async cancelReservation(reservationId: string): Promise<boolean> {
    return false;
  }
}
