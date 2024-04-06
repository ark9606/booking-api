import { Test, TestingModule } from '@nestjs/testing';
import { ReservationsService } from '../../src/reservations/application/reservations.service';
import { DI_TOKENS } from '../../src/common/di-tokens';
import { ReservationRepositoryMock } from './reservation.repository.mock';
import { RoomRepositoryMock } from '../rooms/room.repository.mock';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { EventEmitterMock } from '../common/event-emitter.mock';

describe('ReservationsService', () => {
  let service: ReservationsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ReservationsService,
        {
          provide: DI_TOKENS.RESERVATION_REPOSITORY,
          useClass: ReservationRepositoryMock,
        },
        { provide: DI_TOKENS.ROOM_REPOSITORY, useClass: RoomRepositoryMock },
        // todo replace with mock
        // EventEmitter2,
        { provide: EventEmitter2, useClass: EventEmitterMock },
      ],
    }).compile();

    service = module.get<ReservationsService>(ReservationsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
