import { RoomDTO, RoomListItemDTO } from './room.dto';

export interface ListRoomsParams {
  skip?: number;
  take?: number;
  orderBy?: 'price' | 'area';
  orderDirection: 'ASC' | 'DESC';
}

export interface IRoomRepository {
  list(params: ListRoomsParams): Promise<[RoomListItemDTO[], number]>;

  findById(id: string): Promise<RoomDTO | null>;
}
