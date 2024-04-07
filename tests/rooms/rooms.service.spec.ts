import { Test, TestingModule } from '@nestjs/testing';
import {
  RESERVE_MAX_DAYS_AHEAD,
  RoomsService,
} from '../../src/rooms/application/rooms.service';
import { RoomRepositoryMock } from './room.repository.mock';
import { DI_TOKENS } from '../../src/common/di-tokens';
import { ReservationRepositoryMock } from '../reservations/reservation.repository.mock';
import { generateUUID } from '../../src/common/utils';

describe('RoomsService', () => {
  let service: RoomsService;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
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

    // todo create tests for getAvailability logic
  });
});
