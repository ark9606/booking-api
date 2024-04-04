import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Module } from '@nestjs/common';
import { UserEntity } from 'src/users/user.entity';
import { ReservationsController } from './infrastructure/api/reservations.controller';
import { ReservationsService } from './application/reservations.service';
import { ReservationEntity } from './infrastructure/persistence/reservation.entity';
import { ReservationRepository } from './infrastructure/persistence/reservation.repository';
import { DI_TOKENS } from 'src/common/di-tokens';

@Module({
  imports: [MikroOrmModule.forFeature([UserEntity, ReservationEntity])],
  controllers: [ReservationsController],
  providers: [
    ReservationsService,
    {
      provide: DI_TOKENS.RESERVATION_REPOSITORY,
      useClass: ReservationRepository,
    },
  ],
})
export class ReservationsModule {}
