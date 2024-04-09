import {
  BadRequestException,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { RoomDTO } from './room.dto';
import { IRoomRepository } from './room.repository.interface';
import { DI_TOKENS } from '../../common/di-tokens';
import { ListRoomsResponse } from '../infrastructure/api/listRooms/ListRoomsResponse';
import { IReservationRepository } from '../../reservations/application/reservation.repository.interface';
import { GetRoomAvailabilityResponse } from '../infrastructure/api/getRoomAvailability/GetRoomAvailabilityResponse';
import { ListRoomsRequestQuery } from '../infrastructure/api/listRooms/ListRoomsRequest';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';

export const RESERVE_MAX_DAYS_AHEAD = 181;
// we need to add some time for cleaning after reservation
// but for visibility of testing we will set it to 0
const CLEANING_HOURS = 0; // 1000 * 60 * 60 * 2

@Injectable()
export class RoomsService {
  constructor(
    @Inject(DI_TOKENS.ROOM_REPOSITORY)
    private readonly roomRepository: IRoomRepository,
    @Inject(DI_TOKENS.RESERVATION_REPOSITORY)
    private readonly reservationRepository: IReservationRepository,
    @Inject(CACHE_MANAGER) private cacheService: Cache,
  ) {}

  public async list(params: ListRoomsRequestQuery): Promise<ListRoomsResponse> {
    const [items, count] = await this.roomRepository.list(params);
    return { count, items };
  }

  public async findById(id: string): Promise<RoomDTO> {
    const room = await this.roomRepository.findById(id);

    if (!room) {
      throw new NotFoundException('Room not found');
    }
    return room;
  }

  public async getAvailability(
    roomId: string,
    from: Date,
    to: Date,
  ): Promise<GetRoomAvailabilityResponse> {
    // validate date range
    const maxDateTo = new Date(
      new Date().getTime() + 1000 * 60 * 60 * 24 * RESERVE_MAX_DAYS_AHEAD,
    );
    if (to.getTime() > maxDateTo.getTime()) {
      throw new BadRequestException(
        `Date range is too far ahead. Max date can be ${RESERVE_MAX_DAYS_AHEAD} days ahead.`,
      );
    }

    // prepare period from and to
    const periodFrom = new Date(from.getTime());
    periodFrom.setUTCHours(0, 0, 0, 0);
    const periodTo = new Date(to.getTime());
    periodTo.setUTCHours(23, 59, 59, 999);

    const cacheKey = `room_availability:${roomId}:${periodFrom.toISOString()}:${periodTo.toISOString()}`;
    const cachedData =
      await this.cacheService.get<GetRoomAvailabilityResponse>(cacheKey);
    if (cachedData) {
      return cachedData;
    }

    const room = await this.findById(roomId);

    // get reservations for the room in the period
    const reservations = await this.reservationRepository.listReservations({
      room,
      dateStart: periodFrom,
      dateEnd: periodTo,
    });
    reservations.sort((a, b) => a.dateStart.getTime() - b.dateStart.getTime());

    // calculate availability periods
    const availability: [string, string][] = [];
    const current = new Date(periodFrom);

    for (const reserv of reservations) {
      if (current.getTime() < reserv.dateStart.getTime()) {
        availability.push([
          current.toISOString(),
          reserv.dateStart.toISOString(),
        ]);
      }
      current.setTime(reserv.dateEnd.getTime() + CLEANING_HOURS);
    }
    if (current.getTime() < periodTo.getTime()) {
      availability.push([current.toISOString(), periodTo.toISOString()]);
      current.setTime(periodTo.getTime() + CLEANING_HOURS);
    }

    const output = {
      totalDateRange: {
        from: periodFrom,
        to: periodTo,
      },
      periodsOfAvailability: availability,
    };
    await this.cacheService.set(cacheKey, output);

    return output;
  }
}
