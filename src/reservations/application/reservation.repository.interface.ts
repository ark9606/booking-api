import { RoomDTO } from 'src/rooms/application/room.dto';
import { UserDTO } from 'src/users/application/user.dto';
import { ReservationDTO } from './reservation.dto';

export interface IReservationRepository {
  createReservation(input: {
    user: UserDTO;
    room: RoomDTO;
    dateStart: Date;
    dateEnd: Date;
  }): Promise<string>;

  findById(id: string): Promise<ReservationDTO | null>;

  cancelReservation(reservationId: string): Promise<boolean>;

  listReservations(params: {
    room: RoomDTO;
    dateStart: Date;
    dateEnd: Date;
  }): Promise<ReservationDTO[]>;
}
