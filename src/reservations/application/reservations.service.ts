import { Inject, Injectable } from '@nestjs/common';
import { IReservationRepository } from './reservation.repository.interface';
import { DI_TOKENS } from '../../common/di-tokens';
import { ReservationDTO } from './reservation.dto';
import { EntityManager } from '@mikro-orm/postgresql';
import { ReservationEntity } from '../infrastructure/persistence/reservation.entity';
// import { ReservationRepository } from '../infrastructure/persistence/reservation.repository';

@Injectable()
export class ReservationsService {
  constructor(
    @Inject(DI_TOKENS.RESERVATION_REPOSITORY)
    private readonly reservationRepository: IReservationRepository,
    // private readonly reservationRepository: ReservationRepository,
    // private readonly em: EntityManager,
  ) {}

  public async create(input: {
    userId: string;
    roomId: string;
    dateStart: Date;
    dateEnd: Date;
  }): Promise<ReservationDTO> {
    return this.reservationRepository.createReservation(input) as any;
  }
}
