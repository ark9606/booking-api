import { Module } from '@nestjs/common';
import { RoomsController } from './infrastructure/api/rooms.controller';
import { RoomsService } from './application/rooms.service';
import { DI_TOKENS } from 'src/common/di-tokens';
import { RoomRepository } from './infrastructure/persistence/room.repository';
import { RoomEntity } from './infrastructure/persistence/room.entity';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { ReservationRepository } from '../reservations/infrastructure/persistence/reservation.repository';
import { ReservationEntity } from '../reservations/infrastructure/persistence/reservation.entity';

@Module({
  imports: [MikroOrmModule.forFeature([RoomEntity, ReservationEntity])],
  controllers: [RoomsController],
  providers: [
    RoomsService,
    { provide: DI_TOKENS.ROOM_REPOSITORY, useClass: RoomRepository },
    {
      provide: DI_TOKENS.RESERVATION_REPOSITORY,
      useClass: ReservationRepository,
    },
  ],
})
export class RoomsModule {}
