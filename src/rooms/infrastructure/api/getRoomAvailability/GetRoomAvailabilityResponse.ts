import { ApiProperty } from '@nestjs/swagger';

class GetRoomAvailabilityResponseRange {
  @ApiProperty()
  from: Date;

  @ApiProperty()
  to: Date;
}

export class GetRoomAvailabilityResponse {
  @ApiProperty({ type: GetRoomAvailabilityResponseRange })
  totalDateRange: GetRoomAvailabilityResponseRange;

  @ApiProperty({
    type: 'array',
    items: {
      type: 'array',
      items: { type: 'string' },
      minItems: 2,
      maxItems: 2,
    },
  })
  periodsOfAvailability: [string, string][];
}
