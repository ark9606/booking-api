import { Module } from '@nestjs/common';
import { RoomsController } from './infrastructure/rooms.controller';
import { RoomsService } from './application/rooms.service';
import { DI_TOKENS } from 'src/common/di-tokens';
import { RoomRepository } from './infrastructure/room.repository';
import { RoomEntity } from './infrastructure/room.entity';
import { MikroOrmModule } from '@mikro-orm/nestjs';

@Module({
  imports: [MikroOrmModule.forFeature([RoomEntity])],
  controllers: [RoomsController],
  providers: [
    RoomsService,
    { provide: DI_TOKENS.ROOM_REPOSITORY, useClass: RoomRepository },
  ],
})
export class RoomsModule {}
