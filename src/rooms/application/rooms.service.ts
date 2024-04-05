import { Inject, Injectable } from '@nestjs/common';
import { RoomDTO } from './room.dto';
import { IRoomRepository } from './room.repository.interface';
import { DI_TOKENS } from 'src/common/di-tokens';
import { ListRoomsResponse } from '../infrastructure/api/listRooms/ListRoomsResponse';

@Injectable()
export class RoomsService {
  constructor(
    @Inject(DI_TOKENS.ROOM_REPOSITORY)
    private readonly roomRepository: IRoomRepository,
  ) {}

  public async list(params: {
    skip: number;
    take: number;
  }): Promise<ListRoomsResponse> {
    const [items, count] = await this.roomRepository.list(params);
    return { count, items };
  }

  public async findById(id: string): Promise<RoomDTO> {
    return this.roomRepository.findById(id);
  }
}
