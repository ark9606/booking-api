import { Controller, Get, Param } from '@nestjs/common';
import { RoomsService } from '../application/rooms.service';

@Controller('rooms')
export class RoomsController {
  constructor(private readonly roomsService: RoomsService) {}

  @Get('')
  public async list() {
    return this.roomsService.list();
  }

  @Get(':roomId')
  public async getOne(@Param('roomId') roomId: string) {
    return this.roomsService.findById(roomId);
  }
}
