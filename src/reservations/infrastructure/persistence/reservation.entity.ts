import { Entity, ManyToOne, PrimaryKey, Property } from '@mikro-orm/core';
import { RoomEntity } from '../../../rooms/infrastructure/persistence/room.entity';
import { UserEntity } from '../../../users/infrastructure/persistence/user.entity';
import { v4 } from 'uuid';

@Entity({ tableName: 'reservations' })
export class ReservationEntity {
  @PrimaryKey({ type: 'uuid', name: 'ReservationId' })
  reservationId: string = v4();

  @Property({ type: 'timestamp', name: 'DateStart' })
  dateStart!: Date;

  @Property({ type: 'timestamp', name: 'DateEnd' })
  dateEnd!: Date;

  @Property({ type: 'number', name: 'StatusCode' })
  statusCode!: number;

  @ManyToOne(() => UserEntity, { name: 'UserId' })
  user!: UserEntity;

  @ManyToOne(() => RoomEntity, { name: 'RoomId' })
  room!: RoomEntity;

  userId: string;

  roomId: string;
}
