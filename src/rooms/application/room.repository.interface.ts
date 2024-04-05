import { RoomDTO, RoomListItemDTO } from './room.dto';

export interface IRoomRepository {
  list(params: {
    skip: number;
    take: number;
  }): Promise<[RoomListItemDTO[], number]>;
  findById(id: string): Promise<RoomDTO | null>;
}
