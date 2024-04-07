import { Test, TestingModule } from '@nestjs/testing';
import {
  RESERVE_MAX_DAYS_AHEAD,
  RoomsService,
} from '../../src/rooms/application/rooms.service';
import { RoomRepositoryMock } from './room.repository.mock';
import { DI_TOKENS } from '../../src/common/di-tokens';
import { ReservationRepositoryMock } from '../reservations/reservation.repository.mock';
import { generateUUID } from '../../src/common/utils';
import { RoomFixture } from './room.fixture';
import { IRoomRepository } from '../../src/rooms/application/room.repository.interface';
import { IReservationRepository } from '../../src/reservations/application/reservation.repository.interface';
import { ReservationFixture } from '../reservations/reservation.fixture';

describe('RoomsService', () => {
  let service: RoomsService;

  let module: TestingModule;
  beforeAll(async () => {
    module = await Test.createTestingModule({
      providers: [
        RoomsService,
        { provide: DI_TOKENS.ROOM_REPOSITORY, useClass: RoomRepositoryMock },
        {
          provide: DI_TOKENS.RESERVATION_REPOSITORY,
          useClass: ReservationRepositoryMock,
        },
      ],
    }).compile();

    service = module.get<RoomsService>(RoomsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('getAvailability', () => {
    it('should throw BadRequestException if given dates are invalid', async () => {
      await expect(
        service.getAvailability(
          generateUUID(),
          new Date('invalid'),
          new Date(),
        ),
      ).rejects.toThrow('Invalid date range');
      await expect(
        service.getAvailability(
          generateUUID(),
          new Date(),
          new Date('invalid'),
        ),
      ).rejects.toThrow('Invalid date range');
    });

    it('should throw BadRequestException if start date is after the end date', async () => {
      await expect(
        service.getAvailability(generateUUID(), new Date(), new Date()),
      ).rejects.toThrow('Start date should be before end date');

      const to = new Date();
      const from = new Date(to);
      from.setDate(to.getDate() + 1);

      await expect(
        service.getAvailability(generateUUID(), from, to),
      ).rejects.toThrow('Start date should be before end date');
    });

    it('should throw BadRequestException if end date is more than allowed days ahead', async () => {
      const from = new Date();
      const to = new Date(from);
      to.setDate(to.getDate() + 182);

      await expect(
        service.getAvailability(generateUUID(), from, to),
      ).rejects.toThrow(
        `Date range is too far ahead. Max date can be ${RESERVE_MAX_DAYS_AHEAD} days ahead.`,
      );
    });

    it('should return availability for given room and date range for entire period', async () => {
      const from = new Date();
      from.setUTCHours(0, 0, 0, 0);

      const to = new Date(from.getTime() + 1000 * 60 * 60 * 24 * 2);
      to.setUTCHours(23, 59, 59, 999);

      const room = RoomFixture.createDTO();

      const roomRepo = module.get<IRoomRepository>(DI_TOKENS.ROOM_REPOSITORY);
      roomRepo.findById = jest.fn(async () => room);

      const reservationRepo = module.get<IReservationRepository>(
        DI_TOKENS.RESERVATION_REPOSITORY,
      );
      reservationRepo.listReservations = jest.fn(async () => []);

      const res = await service.getAvailability(room.roomId, from, to);

      expect(res).toBeDefined();
      expect(res.totalDateRange).toMatchObject({ from, to });
      expect(res.periodsOfAvailability).toHaveLength(1);
      expect(res.periodsOfAvailability[0]).toEqual([
        from.toISOString(),
        to.toISOString(),
      ]);
    });

    it('should return an empty list availability for given room and date range', async () => {
      const from = new Date();
      from.setUTCHours(0, 0, 0, 0);

      const to = new Date(from.getTime() + 1000 * 60 * 60 * 24 * 2);
      to.setUTCHours(23, 59, 59, 999);

      const room = RoomFixture.createDTO();

      const roomRepo = module.get<IRoomRepository>(DI_TOKENS.ROOM_REPOSITORY);
      roomRepo.findById = jest.fn(async () => room);

      const reservationRepo = module.get<IReservationRepository>(
        DI_TOKENS.RESERVATION_REPOSITORY,
      );
      reservationRepo.listReservations = jest.fn(async () => [
        ReservationFixture.createDTO({ room, dateStart: from, dateEnd: to }),
      ]);

      const res = await service.getAvailability(
        room.roomId,
        new Date(from.getTime()),
        new Date(to.getTime()),
      );

      expect(res).toBeDefined();
      expect(res.totalDateRange).toMatchObject({ from, to });
      expect(res.periodsOfAvailability).toHaveLength(0);
    });

    it('should return list of availability for given room and date range when some days are booked', async () => {
      const from = new Date();
      from.setUTCHours(0, 0, 0, 0);

      const to = new Date(from.getTime() + 1000 * 60 * 60 * 24 * 7);
      to.setUTCHours(23, 59, 59, 999);

      const room = RoomFixture.createDTO();

      const roomRepo = module.get<IRoomRepository>(DI_TOKENS.ROOM_REPOSITORY);
      roomRepo.findById = jest.fn(async () => room);

      const reservationRepo = module.get<IReservationRepository>(
        DI_TOKENS.RESERVATION_REPOSITORY,
      );
      reservationRepo.listReservations = jest.fn(async () => [
        ReservationFixture.createDTO({
          room,
          dateStart: new Date(from.getTime() + 1000 * 60 * 60 * 24 * 3),
          dateEnd: new Date(from.getTime() + 1000 * 60 * 60 * 24 * 4),
        }),
      ]);

      const res = await service.getAvailability(
        room.roomId,
        new Date(from.getTime()),
        new Date(to.getTime()),
      );

      expect(res).toBeDefined();
      expect(res.totalDateRange).toMatchObject({ from, to });
      expect(res.periodsOfAvailability).toHaveLength(2);
      expect(res.periodsOfAvailability).toEqual([
        [
          from.toISOString(),
          new Date(from.getTime() + 1000 * 60 * 60 * 24 * 3).toISOString(),
        ],
        [
          new Date(from.getTime() + 1000 * 60 * 60 * 24 * 4).toISOString(),
          to.toISOString(),
        ],
      ]);
    });
  });
});
