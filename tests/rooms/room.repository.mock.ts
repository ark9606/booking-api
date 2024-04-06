import { RoomDTO, RoomListItemDTO } from 'src/rooms/application/room.dto';
import {
  IRoomRepository,
  ListRoomsParams,
} from 'src/rooms/application/room.repository.interface';

export class RoomRepositoryMock implements IRoomRepository {
  public async list(
    params: ListRoomsParams,
  ): Promise<[RoomListItemDTO[], number]> {
    return [[], 1];
  }

  public async findById(id: string): Promise<RoomDTO | null> {
    return null;
  }
}
