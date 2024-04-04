import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Module } from '@nestjs/common';
import { UserEntity } from 'src/users/user.entity';
import { ReservationsController } from './reservations.controller';

@Module({
  imports: [MikroOrmModule.forFeature([UserEntity])],
  controllers: [ReservationsController],
})
export class ReservationsModule {}
