import {
  Collection,
  Entity,
  OneToMany,
  PrimaryKey,
  Property,
} from '@mikro-orm/core';
import { ReservationEntity } from '../reservations/reservation.entity';
import { v4 } from 'uuid';

@Entity({ tableName: 'users' })
export class UserEntity {
  @PrimaryKey({ type: 'uuid', name: 'UserId' })
  userId: string = v4();

  @Property({ type: 'text', name: 'FirstName' })
  firstName!: string;

  @Property({ type: 'text', name: 'LastName' })
  lastName!: string;

  @Property({ type: 'text', name: 'Email' })
  email!: string;

  @OneToMany(() => ReservationEntity, (reservation) => reservation.user)
  reservations = new Collection<ReservationEntity>(this);
}
