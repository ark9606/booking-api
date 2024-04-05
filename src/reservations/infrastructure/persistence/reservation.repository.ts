import { InjectRepository } from '@mikro-orm/nestjs';
import { EntityRepository } from '@mikro-orm/postgresql';
import { ReservationEntity } from './reservation.entity';
import { IReservationRepository } from '../../application/reservation.repository.interface';
import { BadRequestException } from '@nestjs/common';
import { RESERVATION_STATUS } from '../../constants';
import { RoomDTO } from 'src/rooms/application/room.dto';
import { RoomMapper } from 'src/rooms/infrastructure/room.mapper';
import { UserDTO } from 'src/users/user.dto';
import { UserMapper } from 'src/users/user.mapper';
import { ReservationDTO } from 'src/reservations/application/reservation.dto';
import { ReservationMapper } from './reservation.mapper';

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

  public async findById(id: string): Promise<ReservationDTO | null> {
    const entity = await this.repository.findOne({ reservationId: id });
    if (!entity) {
      return null;
    }
    return ReservationMapper.toDTO(entity);
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
      const samePeriodReservations = await repo.find({
        room: input.room,
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
