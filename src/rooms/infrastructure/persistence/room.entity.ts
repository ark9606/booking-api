import {
  Collection,
  Entity,
  OneToMany,
  PrimaryKey,
  Property,
} from '@mikro-orm/core';
import { ReservationEntity } from '../../../reservations/infrastructure/persistence/reservation.entity';
import { v4 } from 'uuid';

@Entity({ tableName: 'rooms' })
export class RoomEntity {
  @PrimaryKey({ type: 'uuid', name: 'RoomId' })
  roomId: string = v4();

  @Property({ type: 'text', name: 'Title' })
  title!: string;

  @Property({ type: 'text', name: 'Location' })
  location!: string;

  @Property({ type: 'text', name: 'Description' })
  description!: string;

  @Property({ name: 'Area' })
  area!: number;

  @Property({ type: 'numeric', name: 'Price', precision: 10, scale: 2 })
  price!: number;

  @OneToMany(() => ReservationEntity, (reservation) => reservation.room)
  reservations = new Collection<ReservationEntity>(this);

  @Property({ name: 'CreatedAt' })
  createdAt = new Date();
}
