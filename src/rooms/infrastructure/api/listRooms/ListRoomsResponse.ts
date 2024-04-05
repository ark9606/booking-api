import { RoomListItemDTO } from '../../../application/room.dto';

export class ListRoomsResponse {
  count: number;
  items: RoomListItemDTO[];
}
