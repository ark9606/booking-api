import { Entity, ManyToOne, PrimaryKey, Property } from '@mikro-orm/core';
import { RoomEntity } from '../rooms/infrastructure/room.entity';
import { UserEntity } from '../users/user.entity';
import { v4 } from 'uuid';

@Entity({ tableName: 'reservations' })
export class ReservationEntity {
  @PrimaryKey({ type: 'uuid', name: 'ReservationId' })
  reservationId: string = v4();

  @Property({ type: 'date', name: 'DateStart' })
  dateStart!: string;

  @Property({ type: 'date', name: 'DateEnd' })
  dateEnd!: string;

  @Property({ type: 'number', name: 'StatusCode' })
  statusCode!: number;

  @ManyToOne(() => UserEntity, { name: 'UserId' })
  user!: UserEntity;

  @ManyToOne(() => RoomEntity, { name: 'RoomId' })
  room!: RoomEntity;
}
