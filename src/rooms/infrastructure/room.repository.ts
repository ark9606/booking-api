import { IRoomRepository } from '../application/room.repository.interface';
import { RoomEntity } from './room.entity';
import { InjectRepository } from '@mikro-orm/nestjs';
import { EntityRepository } from '@mikro-orm/core';
import { RoomListItemDTO } from '../application/room.dto';

export class RoomRepository implements IRoomRepository {
  constructor(
    @InjectRepository(RoomEntity)
    private readonly repository: EntityRepository<RoomEntity>,
  ) {}

  public async list(): Promise<RoomListItemDTO[]> {
    return this.repository.findAll({
      fields: ['roomId', 'title', 'location', 'area', 'price'],
    });
  }

  public async findById(id: string): Promise<RoomEntity | null> {
    return this.repository.findOne({ roomId: id });
  }
}
