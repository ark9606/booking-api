import { ApiProperty } from '@nestjs/swagger';
import { RoomListItemDTO } from '../../../application/room.dto';

export class ListRoomsResponseItem {
  @ApiProperty()
  roomId: string;

  @ApiProperty()
  title: string;

  @ApiProperty()
  location: string;

  @ApiProperty()
  area: number;

  @ApiProperty()
  price: number;
}

export class ListRoomsResponse {
  @ApiProperty()
  count: number;

  @ApiProperty({ type: [ListRoomsResponseItem] })
  items: ListRoomsResponseItem[];
}
