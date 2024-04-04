import { Inject, Injectable } from '@nestjs/common';
import { IReservationRepository } from './reservation.repository.interface';
import { DI_TOKENS } from '../../common/di-tokens';
import { ReservationDTO } from './reservation.dto';
import { EntityManager } from '@mikro-orm/postgresql';
import { ReservationEntity } from '../infrastructure/persistence/reservation.entity';

@Injectable()
export class ReservationsService {
  constructor(
    // @Inject(DI_TOKENS.RESERVATION_REPOSITORY)
    // private readonly reservationRepository: IReservationRepository,
    private readonly em: EntityManager,
  ) {}

  public async create(input: {
    userId: string;
    roomId: string;
    dateStart: Date;
    dateEnd: Date;
  }): Promise<ReservationDTO> {
    const em = this.em.fork();
    const qb = em
      .createQueryBuilder(ReservationEntity, 'r')
      .select('*')
      .where({ room: input.roomId })
      .andWhere(
        '("r"."DateStart" >= ? AND "r"."DateStart" <= ?) OR ("r"."DateEnd" >= ? AND "r"."DateEnd" <= ?) OR ("r"."DateStart" < ? AND "r"."DateEnd" > ?)',
        // {
          // dateStart: input.dateStart,
          // dateEnd: input.dateEnd,
        // },
        [
          input.dateStart,
          input.dateEnd,
          input.dateStart,
          input.dateEnd,
          input.dateStart,
          input.dateEnd,
        ],
      );
    const query = qb.getQuery();

    // .orWhere({ dateEnd: { $gte: input.dateStart, $lte: input.dateEnd } })
    // .orWhere({ dateStart: { $gte: input.dateStart, $lte: input.dateEnd } })
    // .execute();
    console.log(query);
    return qb.execute();
    // return input as any;
    // return this.reservationRepository.create(userId, roomId, date);
  }
}
