import { Inject, Injectable } from '@nestjs/common';
import { RoomDTO, RoomListItemDTO } from './room.dto';
import { IRoomRepository } from './room.repository.interface';
import { DI_TOKENS } from 'src/common/di-tokens';

@Injectable()
export class RoomsService {
  constructor(
    @Inject(DI_TOKENS.ROOM_REPOSITORY)
    private readonly roomRepository: IRoomRepository,
  ) {}

  public async list(): Promise<RoomListItemDTO[]> {
    return this.roomRepository.list();
  }

  public async findById(id: string): Promise<RoomDTO> {
    return this.roomRepository.findById(id);
  }
}
