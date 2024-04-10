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
import { CacheManagerMock } from '../common/cache-manager.mock';
import { CACHE_MANAGER } from '@nestjs/cache-manager';

describe('ReservationsService', () => {
  let service: ReservationsService;
  let module: TestingModule;

  beforeAll(async () => {
    module = await Test.createTestingModule({
      providers: [
        ReservationsService,
        {
          provide: DI_TOKENS.RESERVATION_REPOSITORY,
          useClass: ReservationRepositoryMock,
        },
        { provide: DI_TOKENS.ROOM_REPOSITORY, useClass: RoomRepositoryMock },
        { provide: EventEmitter2, useClass: EventEmitterMock },
        { provide: CACHE_MANAGER, useClass: CacheManagerMock },
      ],
    }).compile();

    service = module.get<ReservationsService>(ReservationsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should create a reservation for an existing room successfully', async () => {
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

  describe('cancel', () => {
    it('should cancel a room reservation from user created it', async () => {
      const user = UserFixture.createDTO();
      const reservation = ReservationFixture.createDTO({ user });

      const reservationRepo = module.get<IReservationRepository>(
        DI_TOKENS.RESERVATION_REPOSITORY,
      );
      reservationRepo.findById = jest.fn(async () => reservation);
      reservationRepo.cancelReservation = jest.fn(async () => true);

      await service.cancel(user, reservation.reservationId);

      expect(reservationRepo.cancelReservation).toHaveBeenCalledWith(
        reservation.reservationId,
      );
      expect(reservationRepo.cancelReservation).toHaveReturnedWith(
        Promise.resolve(true),
      );
    });

    it('should throw not found exception', async () => {
      const user = UserFixture.createDTO();
      const reservation = ReservationFixture.createDTO({ user });

      const reservationRepo = module.get<IReservationRepository>(
        DI_TOKENS.RESERVATION_REPOSITORY,
      );
      reservationRepo.findById = jest.fn(async () => null);

      await expect(
        service.cancel(user, reservation.reservationId),
      ).rejects.toThrow('Reservation not found');
    });

    it('should throw forbidden exception', async () => {
      const user1 = UserFixture.createDTO();
      const user2 = UserFixture.createDTO();
      const reservation = ReservationFixture.createDTO({ user: user1 });

      const reservationRepo = module.get<IReservationRepository>(
        DI_TOKENS.RESERVATION_REPOSITORY,
      );
      reservationRepo.findById = jest.fn(async () => reservation);

      await expect(
        service.cancel(user2, reservation.reservationId),
      ).rejects.toThrow('User is not allowed to cancel this reservation');
    });
  });
});
