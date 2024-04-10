import { ApiProperty } from '@nestjs/swagger';

export class RoomDetailsResponse {
  @ApiProperty()
  roomId: string;

  @ApiProperty()
  title: string;

  @ApiProperty()
  location: string;

  @ApiProperty()
  description: string;

  @ApiProperty()
  area: number;

  @ApiProperty()
  price: number;
}
