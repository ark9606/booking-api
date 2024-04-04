import { InjectRepository } from '@mikro-orm/nestjs';
import { EntityRepository } from '@mikro-orm/core';
import { ReservationEntity } from './reservation.entity';
import { IReservationRepository } from '../../application/reservation.repository.interface';

export class ReservationRepository implements IReservationRepository {
  constructor(
    @InjectRepository(ReservationEntity)
    private readonly repository: EntityRepository<ReservationEntity>,
  ) {}

  public async create(
    userId: string,
    roomId: string,
    dateStart: Date,
    dateEnd: Date,
  ): Promise<ReservationEntity> {
    // const reservation = new ReservationEntity();
    // reservation.user = userId;
    // reservation.room = roomId;
    // reservation.dateStart = dateStart;
    // reservation.dateEnd = dateEnd;
    // reservation.statusCode = 1;

    // await this.repository.persistAndFlush(reservation);
    // this.repository.transactional(async () => {

    // return reservation;
    return {} as any;
  }
}
