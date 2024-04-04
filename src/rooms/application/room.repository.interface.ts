import { RoomDTO, RoomListItemDTO } from './room.dto';

export interface IRoomRepository {
  list(): Promise<RoomListItemDTO[]>;
  findById(id: string): Promise<RoomDTO | null>;
}
