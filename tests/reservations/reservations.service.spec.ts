import { Test, TestingModule } from '@nestjs/testing';
import { ReservationsService } from '../../src/reservations/application/reservations.service';
import { DI_TOKENS } from '../../src/common/di-tokens';
import { ReservationRepositoryMock } from './reservation.repository.mock';
import { RoomRepositoryMock } from '../rooms/room.repository.mock';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { EventEmitterMock } from '../common/event-emitter.mock';
import { UserFixture } from '../users/user.fixture';
import { faker } from '@faker-js/faker';
import { RoomFixture } from '../rooms/room.fixture';
import { IRoomRepository } from '../../src/rooms/application/room.repository.interface';
import { IReservationRepository } from '../../src/reservations/application/reservation.repository.interface';
import { ReservationFixture } from './reservation.fixture';
import { generateUUID } from '../../src/common/utils';

describe('ReservationsService', () => {
  let service: ReservationsService;
  let module: TestingModule;

  beforeEach(async () => {
    module = await Test.createTestingModule({
      providers: [
        ReservationsService,
        {
          provide: DI_TOKENS.RESERVATION_REPOSITORY,
          useClass: ReservationRepositoryMock,
        },
        { provide: DI_TOKENS.ROOM_REPOSITORY, useClass: RoomRepositoryMock },
        { provide: EventEmitter2, useClass: EventEmitterMock },
      ],
    }).compile();

    service = module.get<ReservationsService>(ReservationsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should create a reservation for an existing room', async () => {
      const room = RoomFixture.createDTO();
      const given = {
        user: UserFixture.createDTO(),
        roomId: room.roomId,
        dateStart: faker.date.soon({ days: 1 }),
        dateEnd: faker.date.soon({ days: 5 }),
      };

      const roomRepo = module.get<IRoomRepository>(DI_TOKENS.ROOM_REPOSITORY);
      const reservationRepo = module.get<IReservationRepository>(
        DI_TOKENS.RESERVATION_REPOSITORY,
      );
      roomRepo.findById = jest.fn(async () => room);
      reservationRepo.findById = jest.fn(async () =>
        ReservationFixture.createDTO({ room }),
      );

      const result = await service.create(given);

      expect(result).toBeDefined();
      expect(typeof result.reservationId).toBe('string');
      expect(result.room?.roomId).toBe(given.roomId);
    });

    it('should throw not found exception', async () => {
      const given = {
        user: UserFixture.createDTO(),
        roomId: generateUUID(),
        dateStart: faker.date.soon({ days: 1 }),
        dateEnd: faker.date.soon({ days: 5 }),
      };

      const roomRepo = module.get<IRoomRepository>(DI_TOKENS.ROOM_REPOSITORY);
      roomRepo.findById = jest.fn(async () => null);

      await expect(service.create(given)).rejects.toThrow('Room not found');
    });
  });
});
