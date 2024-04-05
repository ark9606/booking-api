import { RoomDTO } from 'src/rooms/application/room.dto';
import { UserDTO } from 'src/users/user.dto';

export interface ReservationDTO {
  reservationId: string;
  dateStart: Date;
  dateEnd: Date;
  statusCode: number;
  userId: string;
  roomId: string;
  room?: RoomDTO;
  user?: UserDTO;
}
