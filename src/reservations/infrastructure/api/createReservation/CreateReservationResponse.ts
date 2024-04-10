import { ApiProperty } from '@nestjs/swagger';
import { RoomDetailsResponse } from '../../../../common/infrastructure/api/RoomDetailsResponse/RoomDetailsResponse';

// swagger documentation skipped here for simplicity
export class CreateReservationResponse {
  @ApiProperty()
  reservationId: string;

  @ApiProperty()
  dateStart: Date;

  @ApiProperty()
  dateEnd: Date;

  @ApiProperty({ type: RoomDetailsResponse })
  room: RoomDetailsResponse;
}
