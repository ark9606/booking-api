import { Controller, Get, Param, Query } from '@nestjs/common';
import { RoomsService } from '../../application/rooms.service';
import { ListRoomsResponse } from './listRooms/ListRoomsResponse';

@Controller('rooms')
export class RoomsController {
  constructor(private readonly roomsService: RoomsService) {}

  @Get('')
  public async list(
    @Query('skip') skip: number,
    @Query('take') take: number,
  ): Promise<ListRoomsResponse> {
    return this.roomsService.list({ skip: +skip, take: +take });
  }

  @Get(':roomId')
  public async getOne(@Param('roomId') roomId: string) {
    return this.roomsService.findById(roomId);
  }

  @Get(':roomId/availability')
  public async getRoomAvailability(@Param('roomId') roomId: string) {
    return this.roomsService.findById(roomId);
  }
}
