import { Controller, Get, Param, Query, UseInterceptors } from '@nestjs/common';
import { RoomsService } from '../../application/rooms.service';
import { ListRoomsResponse } from './listRooms/ListRoomsResponse';
import { RoomDTO } from '../../application/room.dto';
import { GetRoomAvailabilityResponse } from './getRoomAvailability/GetRoomAvailabilityResponse';
import { ListRoomsRequestQuery } from './listRooms/ListRoomsRequest';
import { GetRoomAvailabilityRequestQuery } from './getRoomAvailability/GetRoomAvailabilityRequest';
import { CacheInterceptor, CacheTTL } from '@nestjs/cache-manager';
import { CACHE_TTL } from '../../../config';

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

  @UseInterceptors(CacheInterceptor)
  @CacheTTL(CACHE_TTL)
  @Get(':roomId')
  public async getOne(@Param('roomId') roomId: string): Promise<RoomDTO> {
    return this.roomsService.findById(roomId);
  }

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
