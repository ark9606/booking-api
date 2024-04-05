import { InjectRepository } from '@mikro-orm/nestjs';
// import { EntityRepository } from '@mikro-orm/core';
import { EntityManager, EntityRepository } from '@mikro-orm/postgresql';
import { ReservationEntity } from './reservation.entity';
import { IReservationRepository } from '../../application/reservation.repository.interface';
import { BadRequestException } from '@nestjs/common';
import { RESERVATION_STATUS } from '../../constants';
import { UserEntity } from '../../../users/user.entity';
import { RoomEntity } from 'src/rooms/infrastructure/room.entity';
// import { Injectable } from '@nestjs/common';

// @Injectable()
export class ReservationRepository implements IReservationRepository {
  constructor(
    @InjectRepository(ReservationEntity)
    private readonly repository: EntityRepository<ReservationEntity>,
    // private readonly em: EntityManager,
  ) {}

  // export class ReservationRepository
  //   extends EntityRepository<ReservationEntity>
  //   implements IReservationRepository
  // {
  public async createReservation(input: {
    userId: string;
    roomId: string;
    dateStart: Date;
    dateEnd: Date;
  }): Promise<ReservationEntity> {
    const em = this.repository.getEntityManager();
    await em.begin();
    let reservationId: any = null;
    try {
      const user = await em.findOne(UserEntity, {
        userId: input.userId,
      });
      if (!user) {
        throw new BadRequestException('User not found');
      }

      const room = await em.findOne(RoomEntity, {
        roomId: input.roomId,
      });
      if (!room) {
        throw new BadRequestException('Room not found');
      }

      const repo = em.getRepository(ReservationEntity);
      const samePeriodReservations = await repo.find({
        room: input.roomId as any,
        statusCode: RESERVATION_STATUS.CREATED,
        $or: [
          { dateStart: { $gte: input.dateStart, $lte: input.dateEnd } },
          { dateEnd: { $gte: input.dateStart, $lte: input.dateEnd } },
          {
            dateStart: { $lt: input.dateStart },
            dateEnd: { $gt: input.dateEnd },
          },
        ],
      });
      if (samePeriodReservations.length) {
        console.log('Room reserved', samePeriodReservations);
        throw new BadRequestException(
          'Room is already reserved for this period',
        );
      }
      const reservation = new ReservationEntity();
      reservation.user = user;
      reservation.room = room;
      reservation.dateStart = input.dateStart;
      reservation.dateEnd = input.dateEnd;
      reservation.statusCode = RESERVATION_STATUS.CREATED;
      reservationId = await repo.insert(reservation);
      await em.commit();
    } catch (error) {
      await em.rollback();
      throw error;
    }
    if (reservationId) {
      return this.repository.findOneOrFail(reservationId);
    }
  }
}
