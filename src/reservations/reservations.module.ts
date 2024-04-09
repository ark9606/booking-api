import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Module } from '@nestjs/common';
import { UserEntity } from '../users/user.entity';
import { ReservationsController } from './infrastructure/api/reservations.controller';
import { ReservationsService } from './application/reservations.service';
import { ReservationEntity } from './infrastructure/persistence/reservation.entity';
import { ReservationRepository } from './infrastructure/persistence/reservation.repository';
import { DI_TOKENS } from '../common/di-tokens';
import { RoomEntity } from '../rooms/infrastructure/persistence/room.entity';
import { RoomRepository } from '../rooms/infrastructure/persistence/room.repository';

@Module({
  imports: [
    MikroOrmModule.forFeature([UserEntity, ReservationEntity, RoomEntity]),
  ],
  controllers: [ReservationsController],
  providers: [
    ReservationsService,
    {
      provide: DI_TOKENS.RESERVATION_REPOSITORY,
      useClass: ReservationRepository,
    },
    { provide: DI_TOKENS.ROOM_REPOSITORY, useClass: RoomRepository },
  ],
})
export class ReservationsModule {}
