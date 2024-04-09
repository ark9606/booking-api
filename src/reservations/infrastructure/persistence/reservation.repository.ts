import { InjectRepository } from '@mikro-orm/nestjs';
import { EntityRepository } from '@mikro-orm/postgresql';
import { ReservationEntity } from './reservation.entity';
import { IReservationRepository } from '../../application/reservation.repository.interface';
import { BadRequestException, Logger } from '@nestjs/common';
import { RESERVATION_STATUS } from '../../constants';
import { RoomDTO } from 'src/rooms/application/room.dto';
import { RoomMapper } from 'src/rooms/infrastructure/persistence/room.mapper';
import { UserDTO } from 'src/users/user.dto';
import { UserMapper } from 'src/users/user.mapper';
import { ReservationDTO } from 'src/reservations/application/reservation.dto';
import { ReservationMapper } from './reservation.mapper';

// @Injectable()
export class ReservationRepository implements IReservationRepository {
  private readonly logger = new Logger(ReservationRepository.name);

  constructor(
    @InjectRepository(ReservationEntity)
    private readonly repository: EntityRepository<ReservationEntity>,
    // private readonly em: EntityManager,
  ) {}

  // export class ReservationRepository
  //   extends EntityRepository<ReservationEntity>
  //   implements IReservationRepository
  // {

  public async findById(id: string): Promise<ReservationDTO | null> {
    const entity = await this.repository.findOne({ reservationId: id });
    if (!entity) {
      return null;
    }
    return ReservationMapper.toDTO(entity);
  }

  public async listReservations(params: {
    room: RoomDTO;
    dateStart: Date;
    dateEnd: Date;
  }): Promise<ReservationDTO[]> {
    return this.selectReservations(this.repository, params);
  }

  private async selectReservations(
    repo: EntityRepository<ReservationEntity>,
    params: {
      room: RoomDTO;
      dateStart: Date;
      dateEnd: Date;
    },
  ): Promise<ReservationDTO[]> {
    const entities = await repo.find({
      room: params.room,
      statusCode: RESERVATION_STATUS.CREATED,
      $or: [
        { dateStart: { $gte: params.dateStart, $lte: params.dateEnd } },
        { dateEnd: { $gte: params.dateStart, $lte: params.dateEnd } },
        {
          dateStart: { $lt: params.dateStart },
          dateEnd: { $gt: params.dateEnd },
        },
      ],
    });
    return entities.map(ReservationMapper.toDTO);
  }

  public async createReservation(input: {
    user: UserDTO;
    room: RoomDTO;
    dateStart: Date;
    dateEnd: Date;
  }): Promise<string> {
    const em = this.repository.getEntityManager();
    await em.begin();
    try {
      const repo = em.getRepository(ReservationEntity);

      const samePeriodReservations = await this.selectReservations(repo, input);

      if (samePeriodReservations.length) {
        this.logger.error('Failed to create reservation. %o', {
          samePeriodReservations,
        });
        throw new BadRequestException(
          'Room is already reserved for this period',
        );
      }
      const reservation = new ReservationEntity();
      reservation.user = UserMapper.toEntity(input.user);
      reservation.room = RoomMapper.toEntity(input.room);
      reservation.dateStart = input.dateStart;
      reservation.dateEnd = input.dateEnd;
      reservation.statusCode = RESERVATION_STATUS.CREATED;
      const reservationId = await repo.insert(reservation);
      await em.commit();
      return reservationId as unknown as string;
    } catch (error) {
      await em.rollback();
      throw error;
    }
  }

  public async cancelReservation(reservationId: string): Promise<boolean> {
    const affected = await this.repository.nativeUpdate(
      { reservationId },
      { statusCode: RESERVATION_STATUS.CANCELLED },
    );
    return affected === 1;
  }
}
