import { Controller, Get, Param, Query } from '@nestjs/common';
import { RoomsService } from '../../application/rooms.service';
import { ListRoomsResponse } from './listRooms/ListRoomsResponse';
import { RoomDTO } from 'src/rooms/application/room.dto';
import { GetRoomAvailabilityResponse } from './getRoomAvailability/GetRoomAvailabilityResponse';
import { ListRoomsRequestQuery } from './listRooms/ListRoomsRequest';
import { GetRoomAvailabilityRequestQuery } from './getRoomAvailability/GetRoomAvailabilityRequest';

@Controller('rooms')
export class RoomsController {
  constructor(private readonly roomsService: RoomsService) {}

  @Get('')
  public async list(
    @Query() query: ListRoomsRequestQuery,
  ): Promise<ListRoomsResponse> {
    return this.roomsService.list({
      skip: +query.skip,
      take: +query.take,
      orderDirection: query.orderDirection,
      orderBy: query.orderBy,
    });
  }

  @Get(':roomId')
  public async getOne(@Param('roomId') roomId: string): Promise<RoomDTO> {
    return this.roomsService.findById(roomId);
  }

  // todo maybe add params for availability check
  @Get(':roomId/availability')
  public async getRoomAvailability(
    @Param('roomId') roomId: string,
    @Query() query: GetRoomAvailabilityRequestQuery,
  ): Promise<GetRoomAvailabilityResponse> {
    return this.roomsService.getAvailability(
      roomId,
      new Date(query.from),
      new Date(query.to),
    );
  }
}