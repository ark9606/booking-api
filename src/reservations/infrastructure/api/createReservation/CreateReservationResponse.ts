import { RoomDTO } from 'src/rooms/application/room.dto';

// swagger documentation skipped here for simplicity
export class CreateReservationResponse {
  reservationId: string;
  dateStart: Date;
  dateEnd: Date;
  room: RoomDTO;
}
