// import { ReservationDTO } from 'src/reservations/application/reservation.dto';

export interface RoomDTO {
  roomId: string;
  title: string;
  location: string;
  description: string;
  area: number;
  price: number;
  // reservations?: ReservationDTO[];
}

export type RoomListItemDTO = Pick<
  RoomDTO,
  'roomId' | 'title' | 'location' | 'area' | 'price'
>;
