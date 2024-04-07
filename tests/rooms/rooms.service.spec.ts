import { Test, TestingModule } from '@nestjs/testing';
import { RoomsService } from '../../src/rooms/application/rooms.service';
import { RoomRepositoryMock } from './room.repository.mock';
import { DI_TOKENS } from '../../src/common/di-tokens';
import { ReservationRepositoryMock } from '../reservations/reservation.repository.mock';

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
});
