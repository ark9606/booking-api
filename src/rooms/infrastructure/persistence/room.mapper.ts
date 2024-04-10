import { RoomDTO } from '../../application/room.dto';
import { RoomEntity } from './room.entity';

export class RoomMapper {
  static toDTO(entity: RoomEntity): RoomDTO {
    return {
      roomId: entity.roomId,
      title: entity.title,
      location: entity.location,
      description: entity.description,
      area: entity.area,
      price: entity.price,
    };
  }

  static toEntity(dto: RoomDTO): RoomEntity {
    const entity = new RoomEntity();
    entity.roomId = dto.roomId;
    entity.title = dto.title;
    entity.location = dto.location;
    entity.description = dto.description;
    entity.area = dto.area;
    entity.price = dto.price;
    return entity;
  }
}
