import { IRoomRepository } from '../../application/room.repository.interface';
import { RoomEntity } from './room.entity';
import { InjectRepository } from '@mikro-orm/nestjs';
import { EntityRepository } from '@mikro-orm/core';
import { RoomDTO, RoomListItemDTO } from '../../application/room.dto';
import { RoomMapper } from './room.mapper';

export class RoomRepository implements IRoomRepository {
  constructor(
    @InjectRepository(RoomEntity)
    private readonly repository: EntityRepository<RoomEntity>,
  ) {}

  public async list(params: {
    skip: number;
    take: number;
  }): Promise<[RoomListItemDTO[], number]> {
    const res = await this.repository.findAndCount(
      {},
      {
        offset: params.skip,
        limit: params.take,
        fields: ['roomId', 'title', 'location', 'area', 'price'],
      },
    );
    return res;
  }

  public async findById(id: string): Promise<RoomDTO | null> {
    const room = await this.repository
      .getEntityManager()
      .findOne(RoomEntity, { roomId: id });
    if (!room) {
      return null;
    }
    return RoomMapper.toDTO(room);
  }
}
