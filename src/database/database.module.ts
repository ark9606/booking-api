import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Module } from '@nestjs/common';
// import dbConfig from '../mikro-orm.config';
import { RoomEntity } from '../rooms/infrastructure/room.entity';
import { RoomRepository } from '../rooms/infrastructure/room.repository';
import { DI_TOKENS } from '../common/di-tokens';

@Module({
  imports: [
    // MikroOrmModule.forRoot(dbConfig),
    MikroOrmModule.forFeature([RoomEntity]),
    // MikroOrmModule.forFeature([RoomEntity]),
  ],
  controllers: [],
  providers: [{ provide: DI_TOKENS.ROOM_REPOSITORY, useClass: RoomRepository }],
  exports: [DI_TOKENS.ROOM_REPOSITORY],
})
export class DatabaseModule {}
