import { RoomDTO } from 'src/rooms/application/room.dto';
import { UserDTO } from 'src/users/user.dto';
import { ReservationDTO } from './reservation.dto';

export interface IReservationRepository {
  createReservation(input: {
    user: UserDTO;
    room: RoomDTO;
    dateStart: Date;
    dateEnd: Date;
  }): Promise<string>;

  findById(id: string): Promise<ReservationDTO | null>;
}
